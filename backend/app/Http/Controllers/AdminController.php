<?php

namespace App\Http\Controllers;
use App\Models\Doctor;
use App\Models\Admin;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
Use App\Http\Resources\DoctorResource;
Use App\Http\Resources\UserResource;

class AdminController extends Controller
{

    // add another admin
    public function addAdmin(Request $request){

        $rules = [
            'name' => 'required',
            'email' => [
                'required',
                'email',
                'unique:admins,email',
                function($attribute, $value, $fail){
                    if(
                        User::where('email', $value)->exists()||
                        Admin::where('email', $value)->exists()||
                        Doctor::where('email', $value)->exists()
                    )
                        $fail('email is already registered'); }
            ],
            'password' => 'required|min:6',
        ];

        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        Admin::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
        return response()->json('admin is created successfully!');
    }

//add doctor
    public function addDoctor(Request $request){
            $rules = [
                'name' => 'required',
                'email' => [
                    'required',
                    'email',
                    'unique:doctors,email',
                    function($attribute, $value, $fail){
                        if(
                            User::where('email', $value)->exists()||
                            Admin::where('email', $value)->exists()||
                            Doctor::where('email', $value)->exists()
                        )
                            $fail('email is already registered'); }
                ],

                'password' => 'required|min:6',
                'speciality' => 'required',
                'phone' => 'required|min:11|max:11|unique:doctors,phone',
                'from'=> 'required|date_format:H:i:s',
                'to'=>'required|date_format:H:i:s',
            ];

            $validator = Validator::make($request->all(), $rules);
            if($validator->fails()){
                return response()->json($validator->errors(), 400);
            }
            Doctor::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'speciality' => $request->input('speciality'),
                'phone' => $request->input('phone'),
                'from' => $request->input('from'),
                'to' => $request->input('to'),
            ]);
            return response()->json('doctor is created successfully!');
    }

//show all doctors
    public function showDoctors(){
        $doctors=Doctor::all();
        return response()->json([
            'message' => 'Patients retrieved successfully',
            'Patients' => DoctorResource::collection($doctors)
        ], 200);
    }


//delete specified doctor
    public function deleteDoctor(Request $request){
        $doctorId=Doctor::find( $request->get('id') );

        if($doctorId){
            $doctorId->delete();
            return response()->json('doctor data is deleted successfully!');
        }
        return response()->json('doctor not found!');
    }

     //Show all Patients  Admin
    public function showPatients(Request $request){
        $patients=User::all();
        return response()->json([
            'message' => 'Patients retrieved successfully',
            'Patients' => UserResource::collection($patients)
        ], 200);
    }

//show all payments operations
    public function showPayments(){
        $payments=Payment::all();
        return response()->json($payments);
    }

     // Search Doctor
    public function searchdoctor(Request $request){
        $searchword=$request->has('search') ? $request->input('search') : null ;   //search is the query parameter
        $Doctors =Doctor::when($searchword!= null , function($q) use ($searchword){  //Eloquent query
            $q->where('name' , 'like' ,'%'. $searchword . '%');
        })->get() ;
        if($Doctors){
            return response()->json([
                'message' => 'Doctors retrieved successfuly ',
                'Doctors' => DoctorResource::collection($Doctors)
            ], 200);

        } else{
            return response()->json(['No matching data'
        ], 200);
        }

}

}
