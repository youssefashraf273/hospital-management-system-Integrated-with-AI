<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User; 
use App\Models\Doctor; 
use App\Models\Pharmacy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class PharmacistController extends Controller
{
    public function addMedicine(Request $request){
        $doctor = Auth::guard('doctor-api')->user();
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
        // Allow only pharmacist to add medicine
         if (strtolower($doctor->speciality) !== 'pharmacist') {
        return response()->json(['error' => 'Access denied. Only pharmacists can add medicine.'], 403);
        }

        $rules = [
            'medicine_name' => 'required|string|max:255',
            'medicine_price'=>'required|numeric ',
            'medicine_quantity'=>'required|integer'

        ];
        $validator = Validator::make($request->all(), $rules);
            if($validator->fails()){
                return response()->json($validator->errors(), 400);
            }

        $medicine = Pharmacy::create([
          'medicine_name' => $request->medicine_name,
          'medicine_price' => $request->medicine_price,
          'medicine_quantity' => $request->medicine_quantity,  
        ]);
        return response()->json([
            'message' => 'Medicine is added successfully!',
             'medicine' => $medicine], 
             201);
    }

    //show all Medicines
    public function showMedicines(){
        $doctor = Auth::guard('doctor-api')->user();
        if (!$doctor) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        // Allow only pharmacist to add medicine
         if (strtolower($doctor->speciality) !== 'pharmacist') {
        return response()->json(['error' => 'Access denied. Only pharmacists can add medicine.'], 403);
        }
        $medicines=Pharmacy::all();
        return response()->json([
            'message' => 'Medicines retrieved successfully!',
            'medicines' => $medicines
        ], 200);
    }

    //Update Medicine 
    public function updateMedicine(Request $request, $id)
{
    $doctor = Auth::guard('doctor-api')->user();
    if (!$doctor) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Only pharmacists can update medicine
    if (strtolower($doctor->speciality) !== 'pharmacist') {
        return response()->json(['error' => 'Access denied. Only pharmacists can update medicine.'], 403);
    }

    $medicine = Pharmacy::find($id);
    if (!$medicine) {
        return response()->json(['error' => 'Medicine not found'], 404);
    }

    $rules = [
        'medicine_name' => 'sometimes|required|string|max:255',
        'medicine_price' => 'sometimes|required|numeric',
        'medicine_quantity' => 'sometimes|required|integer',
    ];

    $validator = Validator::make($request->all(), $rules);
    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }
    if ($request->has('medicine_name')) {
        
        $medicine->medicine_name = $request->medicine_name;
    }
    if ($request->has('medicine_price')) {
        $medicine->medicine_price = $request->medicine_price;
    }
    if ($request->has('medicine_quantity')) {
        $medicine->medicine_quantity = $request->medicine_quantity;
    }

    //$medicine->update($request->only(['medicine_name', 'medicine_price', 'medicine_quantity']));
    $medicine->save();
    return response()->json([
        'message' => 'Medicine updated successfully!',
        'medicine' => $medicine
    ], 200);
}

}
