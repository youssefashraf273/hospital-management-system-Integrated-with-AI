<?php

namespace App\Http\Controllers;
use App\Models\LabTest;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\MedicalRecord;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use  App\Http\Resources\UserResource;
use  App\Http\Resources\MedicalRecordResource;
use  App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    //search patient for Doctors and Labstaff
    public function searchPatient(Request $request){
        $doctor = Auth::guard('doctor-api')->user();
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);//look here later-----
        }
        if (in_array(strtolower($doctor->speciality), ['pharmacist'])) { //Pharmacist doesn't have access to patients
            return response()->json(['error' => 'Access denied for this specialty'], 403);
        }

        $searchword=$request->has('search') ? $request->input('search') : null ;   //search is the query parameter
        $patients =User::when($searchword!= null , function($q) use ($searchword){
            $q->where('FullName' , 'like' ,'%'. $searchword . '%');
        })->get() ;
        if($patients){
            return response()->json([
                'message' => 'Patients retrieved successfuly ',
                'Patients' => UserResource::collection($patients)
            ], 200);

        } else{
            return response()->json(['No matching data'
        ], 200);
        }
}
    //Get Patient's Medical Records
    public function patientMedicalRecords(Request $request , $patientid){

        $doctor = Auth::guard('doctor-api')->user();
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (in_array(strtolower($doctor->speciality), ['pharmacist', 'labtest' , 'lab test' , 'lab staff'])) {
            return response()->json(['error' => 'Access denied for this specialty'], 403);
        }
        $medicalrecords = MedicalRecord::where('user_id', $patientid)->get();
        if($medicalrecords){
        return response()->json([
            'message' => 'Medical Records retrieved successfuly ',
            'Medical Records ' => MedicalRecordResource::collection($medicalrecords)
        ], 200);
        }
        else{
        return response()->json(['No Medical Records for this patient'], 200);
        }
    }
    //View All Appointement
    public function getAllAppointments(){
        $doctor = Auth::guard('doctor-api')->user();
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (in_array(strtolower($doctor->speciality), ['pharmacist', 'labtest' , 'lab test' , 'lab staff'])) {
            return response()->json(['error' => 'Access denied for this specialty'], 403);
        }

        // Retrieve all doctor's appointments
        $appointments = Appointment::where('doctor_id', $doctor->id)->get();

        return response()->json([
            'message' => 'Your all Appointments with patients ',
            'appointments' => AppointmentResource::collection($appointments)
        ], 200);
    }
    public function getTodaysAppointments(){
        $doctor = Auth::guard('doctor-api')->user();
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (in_array(strtolower($doctor->speciality), ['pharmacist', 'labtest' , 'lab test' , 'lab staff'])) {
            return response()->json(['error' => 'Access denied for this specialty'], 403);
        }

        $today = now()->toDateString();

        // Retrieve today's appointments of the patient
        $appointments = Appointment::where('doctor_id', $doctor->id)
            ->where('date', $today)->get();

        return response()->json([
            'message' => 'Your Today’s Appointments  with patients',
            'appointments' => AppointmentResource::collection($appointments)
        ], 200);
    }

    //---Add medical record---
    public function addMedicalRecord(Request $request, $id){

        $doctor=Auth::guard('doctor-api')->user();
        if (in_array(strtolower($doctor->speciality), ['lab test', 'lab staff', 'pharmacist'])){
            return response()->json('Sorry! you are not authorized to manage medical record');
        }

        $user = User::find($id);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
        $rules=[
            'diagnosis'=>'required',
            'symptoms'=>'required',
            'notes'=>'required',
            'prescribed_medication'=>'required',
        ];

        $validator=Validator::make($request->all() , $rules);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        MedicalRecord::create([
            'user_id' => $user->id,
            'doctor_id' => $doctor->id,
            'diagnosis'=>$request->input('diagnosis'),
            'symptoms'=>$request->input('symptoms'),
            'prescribed_medication'=>$request->input('prescribed_medication'),
            'notes' => $request->input('notes'),
        ]);
        return response()->json(['message' => 'Medical record is created successfully!'], 201);
    }

//---update medical record----

public function updateMedicalRecord(Request $request, $id){

    $doctor=Auth::guard('doctor-api')->user();
    if (in_array(strtolower($doctor->speciality), ['lab test', 'lab staff', 'pharmacist'])){
        return response()->json('Sorry! you are not authorized to manage medical record');
    }

        $medicalRecord=MedicalRecord::find($id);
        if (!$medicalRecord) {
            return response()->json(['error' => 'Medical record not found'], 404);
        }

    $rules=[
        'diagnosis'=>'sometimes',
        'symptoms'=>'sometimes',
        'notes'=>'sometimes',
        'prescribed_medication'=>'sometimes',
    ];

    $validator=Validator::make($request->all() , $rules);
    if($validator->fails()){
        return response()->json($validator->errors(), 400);
    }

    if ($request->has('diagnosis')) {
        
        $medicalRecord->diagnosis = $request->diagnosis;
    }
    if ($request->has('symptoms')) {
        $medicalRecord->symptoms = $request->symptoms;
    }
    if ($request->has('notes')) {
        $medicalRecord->notes = $request->notes;
    }
    if ($request->has('prescribed_medication')) {
        $medicalRecord->prescribed_medication = $request->prescribed_medication;
    }
    $medicalRecord->save();
    return response()->json([
        'message' => 'Medicical Record updated successfully!',
        'medicine' =>  $medicalRecord
    ], 200);
}


    //---manage appointments---

    public function manageAppointments(Request $request, $appointmentId){

        $doctor = Auth::guard('doctor-api')->user();
        if (in_array(strtolower($doctor->speciality), ['lab test', 'lab staff', 'pharmacist'])){
            return response()->json('Sorry! you are not authorized to manage appointments');
        }

        $appointment = Appointment::find($appointmentId);
            if (!$appointment) {
                return response()->json(['error' => 'Appointment not found'], 404);
            }
            if ($appointment->doctor_id !== $doctor->id) {
                return response()->json(['error' => 'You are not authorized to manage this appointment'], 403);
            }
            if ($appointment->status === 'finished') {
                return response()->json(['message' => 'This appointment has already been marked as finished'], 400);
            }
            $appointment->status = 'finished';
            $appointment->save();

            return response()->json(['message' => 'Appointment marked as finished successfully'], 200);
        }

        //---View lab tests--- for Doctors and Lab staff

    public function viewLabtests(Request $request, $patientid){

        $doctor=Auth::guard('doctor-api')->user();


        if (in_array(strtolower($doctor->speciality), ['pharmacist'])){
            return response()->json(['error' => 'Unauthorized. Only Lab Test specialists can perform this action.'],
        403);
        }

       // Get all lab tests for the patient
         $labtests = LabTest::where('user_id', $patientid)->get();
         if($labtests->isEmpty()){
            return response()->json([
                'message'=>'No labtests for this user',     
            ]);
         }
         return response()->json([
            'message' => 'Lab tests retrieved successfully.',
            'lab_tests' => $labtests
             ], 200);
    }

    }
