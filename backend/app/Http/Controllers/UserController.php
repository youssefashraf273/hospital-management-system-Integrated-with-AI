<?php

namespace App\Http\Controllers;
use App\Models\Payment;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Resources\MedicalRecordResource;
use App\Http\Resources\LabTestResource;
use  App\Http\Resources\DoctorResource;
use  App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Hash;


class UserController extends Controller
{

    //Show all Patients for Doctors except pharmacist
    public function showPatients(Request $request){

        $doctor = Auth::guard('doctor-api')->user();
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (in_array(strtolower($doctor->speciality), ['pharmacist'])) {
            return response()->json(['error' => 'Access denied'], 403);
        }

        $patients=User::all();
        return response()->json([
            'message' => 'Patients retrieved successfully',
            'Patients' => UserResource::collection($patients)
        ], 200);
    }


    // Retrieve the patient's medical records
    public function getmedicalrecords(Request $request){

        $token = $request->header('Authorization');
        if(!$token){
            return response()->json('unauthenticated user!');
        }

        $patient = Auth::guard('api')->setToken($token)->user();

        if (!$patient) {
            return response()->json(['error' => 'Unauthorized - Only patients can access their medical records'], 403);
        }

        $medicalRecords = $patient -> medicalrecord;

        return response()->json([
            'message' => 'Medical records retrieved successfully',
            'patient' => $patient->FullName,
            'medical_records' => MedicalRecordResource::collection($medicalRecords)
        ], 200);
    }

    //get labtests
    public function getlabtests(Request $request){
        $token = $request->header('Authorization');
        if(!$token){
            return response()->json('unauthenticated user!');
        }
        $patient = Auth::guard('api')->setToken($token)->user();
        if (!$patient) {
            return response()->json(['error' => 'Unauthorized - Only patients can access their lab tests'], 403);
        }

        $labtests = $patient->labtest;
        return response()->json([
            'message' => 'Lab test retrieved successfully',
            'patient' => $patient->FullName,
            'medical_records' => LabTestResource::collection($labtests)
        ], 200);
}

public function bookAppointment(Request $request , $doctorid)
{

    $patient = Auth::guard('api')->user();
    if (!$patient) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $today = now()->toDateString();
    $patient_id = $patient->id;
    try{
        DB::beginTransaction();

    $existingAppointments = Appointment::where('doctor_id', $doctorid)
        ->where('date',$today)
        ->lockForUpdate() //to prevent race condition
        ->count();

    if ($existingAppointments >= 20) {
        DB::rollBack();
        return response()->json(['message' => 'Doctor is fully booked on this date'], 409);
    }
    $roleNumber = $existingAppointments + 1;

    $appointment = Appointment::create([
        'user_id' => $patient_id,
        'doctor_id' => $doctorid,
        'date' => $today,
        'created_at' => now(),

    ]);
        DB::commit();

    return response()->json([
        'message' => 'Appointment booked successfully',
        'Your number is ' =>  $roleNumber  ,
    ], 201);

    } catch (\Exception $e) {
        DB::rollBack();
    return response()->json(['error' => 'Could not book appointment'], 500);
    }
}


public function getAllAppointments(){

    $patient = Auth::guard('api')->user();
    if (!$patient) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $patientId = $patient->id;

    $appointments = Appointment::select('id','doctor_id','date')
    ->where('user_id', $patientId)->get();

    return response()->json([
        'message' => 'Your all Appointments ',
        'appointments' => $appointments
    ], 200);
}
public function getTodaysAppointments(){
    $patient = Auth::guard('api')->user();
    if (!$patient) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $patientId = $patient->id;

    $today = now()->toDateString();

    $appointments = Appointment::select('id','doctor_id','date')
        ->where('user_id', $patientId)
        ->where('date', $today)
        ->orderBy('id', 'asc')
        ->get();

    return response()->json([
        'message' => 'Your Today’s Appointments ',
        'appointments' =>  $appointments
    ], 200);
}

   //Categories
    public function categories(Request $request){

        $specialties = Doctor::select('speciality')
            ->whereNotNull('speciality')
            ->whereNotIn('speciality', ['pharmacist', 'labtest', 'lab test' , 'lab staff' ])
            ->distinct()
            ->pluck('speciality');

        return response()->json([
            'message' => 'Specialties retrieved successfully',
            'specialties' => $specialties
        ], 200);
    }
     //View doctors based on selected category

    public function getDoctorsBySpecialty(Request $request){

        $request->validate([
            'speciality' => 'required|exists:doctors,speciality',
        ]);
        $speciality = $request->input('speciality');
        $excludedrules=['pharmacist', 'labtest' , 'lab test' , 'lab staff' ];

        $doctors = Doctor::select('id','name','speciality','phone','from','to')
        ->where('speciality', $speciality)
        ->whereNotIn('speciality', $excludedrules)
        ->get();

    if ($doctors->isEmpty()) {
        abort(404,'No doctors found for this category');
    }

    return response()->json([
        'message' => 'Doctors retrieved successfully.',
        'doctors' => $doctors
    ], 200);
}

//Show doctors
    public function getDoctors(){

    $doctors = Doctor::whereNotIn('speciality', ['pharmacist', 'labtest'])
    ->get();

    if ($doctors->isEmpty()) {
        abort(404,'No doctors found ');
    }
    return response()->json([
        'message' => 'Doctors retrieved successfully.',
        'doctors' => DoctorResource::collection($doctors)
        ], 200);
    }

public function processPayment(Request $request)
{

    $appointmentId=Appointment::findOrFail($request->id);

    $request->validate([
        'card_image' => 'required|image',
        'card_holder_name'=> 'required|string',
        'card_cvv' => 'required|digits_between:3,4',
        'transaction_amount' => 'required|integer|min:50',
    ]);

    $image = $request->file('card_image');

    try {
        $ocrResponse = Http::attach(
            'file', file_get_contents($image), $image->getClientOriginalName()
        )->post('http://127.0.0.1:8002/ocr');
        } catch (\Exception $e) {
        return response()->json(['error' => 'OCR service unavailable'], 503);
    }

    if (!$ocrResponse->successful()) {
        return response()->json(['error' => 'Failed to extract card data'], 500);
    }

    $ocrData = $ocrResponse->json();

    $cardInfo = $ocrData['card_info']??[];
    $mergedData = array_merge(
    $cardInfo,
    $request->only(['card_cvv', 'transaction_amount', 'card_holder_name'])
);
    \Log::info('Merged Data:', $mergedData);

    $validator = Validator::make($mergedData, [
        'card_type'=> 'required|string|max:255',
        'card_holder_name' => 'required|string|max:255',
        'card_number' => 'required|string',
        'card_expire_date' => 'required|string',
        'card_cvv' => 'required|digits_between:3,4',
        'transaction_amount' => 'required|integer|min:50',
    ]);

    if ($validator->fails()) {
    return response()->json([
        'error' => 'Validation failed',
        'details' => $validator->errors(),
    ], 422);
}
    $validated = $validator->validated();

    $user = Auth::user();

    $payment = Payment::create([
        'user_id' => $user->id,
        'appointment_id' =>$appointmentId->id,
        'card_type' => $validated['card_type'],
        'card_holder_name' => $validated['card_holder_name'],
        'card_number' => str_replace(' ', '', $validated['card_number']),
        'card_expire_date' => $validated['card_expire_date'],
        'card_cvv' =>Hash::make( $validated['card_cvv']),
        'transaction_amount' => $validated['transaction_amount'],

    ]);

    return response()->json([
        'appointment_id' =>$appointmentId->id,
        'transaction_id' => $payment->id,
        'message' =>'successful payment ',
    ], 201);
}


public function cancelAppointment(Request $request , $appointmentid)
{
    $patient = Auth::guard('api')->user();
    if (!$patient) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $appointment = Appointment::where('id', $appointmentid)
    ->where('user_id', $patient->id)
    ->where('status', 'pending')
    ->first();

    if (!$appointment) {
        return response()->json(['error' => 'Appointment not found'], 404);
    }
    if (Carbon::parse($appointment->date)->lt(Carbon::today())) {
        return response()->json(['error' => 'Cannot cancel past appointments.'], 400);
    }
    $appointment->delete();
    return response()->json(['message' => 'Appointment cancelled successfully.'], 200);
    }
}

