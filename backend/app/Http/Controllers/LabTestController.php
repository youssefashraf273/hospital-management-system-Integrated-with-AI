<?php

namespace App\Http\Controllers;

use App\Models\LabTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;


class LabTestController extends Controller
{
    //---Add LabTest---

public function addLabtests(Request $request, $id){

    $doctor=Auth::guard('doctor-api')->user();

        if (!in_array(strtolower($doctor->speciality), ['lab test', 'lab staff'])){
            return response()->json(['error' => 'Unauthorized. Only Lab Test specialists can perform this action.'],
        403);
        }
        $user = User::find($id);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
        $rules=[
            'test_name'=>'required',
            'test_description'=>'required',
            'test_category'=>'required',
            'test_reference_range'=>'required',
            'test_value'=>'required',
            'advices'=> 'required',
        ];

        $validator=Validator::make($request->all() , $rules);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        LabTest::create([
            'user_id' => $user->id,
            'doctor_id' => $doctor->id,
            'test_name'=>$request->input('test_name'),
            'test_description'=>$request->input('test_description'),
            'test_category'=>$request->input('test_category'),
            'test_reference_range'=>$request->input('test_reference_range'),
            'test_value'=>$request->input('test_value'),
            'advices'=>$request->input('advices'),
        ]);

        return response()->json(['message' => 'lab test is created successfully!'], 201);
}

}
