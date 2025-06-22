<?php

use App\Http\Controllers\AuthController;
use \App\Http\Controllers\AdminController;
use App\Http\Controllers\LabTestController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\UserController;
use \App\Http\Controllers\DoctorController;
use \App\Http\Controllers\PharmacistController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//----Authentication Routes----
Route::Post('register', [AuthController::class, 'register']);
Route::Post('login', [AuthController::class, 'login']);
Route::get('profile', [AuthController::class, 'profile'])->middleware(['auth_guard:api,admin-api,doctor-api']);
Route::get('logout', [AuthController::class, 'logout'])->middleware(['auth_guard:api,admin-api,doctor-api']);


//-----Admin Module-------
Route::middleware(['admin'])->group(function(){
    Route::Post('addAdmin', [AdminController::class, 'addAdmin']);
    Route::Post('addDoctor', [AdminController::class, 'addDoctor']);
    Route::get('showDoctors', [AdminController::class, 'showDoctors']);
    Route::Post('deleteDoctor', [AdminController::class, 'deleteDoctor']);
    Route::get('admin/showPatients', [AdminController::class, 'showPatients']);
    Route::get('showPayments', [AdminController::class, 'showPayments']);
    Route::get('searchdoctor', [AdminController::class, 'searchdoctor']);
});


//-----Patient Module -------
Route::middleware(['patient'])->group(function(){
    Route::get('/patient/medicalrecords', [UserController::class, 'getmedicalrecords']);
    Route::get('/patient/labtests', [UserController::class, 'getlabtests']);
    Route::Post('/appointments/book/{doctorid}', [UserController::class, 'bookAppointment']);
    Route::get('/patient/allappointments', [UserController::class, 'getAllAppointments']);
    Route::get('/patient/todaysappointments', [UserController::class, 'getTodaysAppointments']);
    Route::get('/doctors', [UserController::class, 'getDoctors']);
    Route::get('/doctors/categories', [UserController::class, 'categories']);
    Route::get('getDoctorsBySpecialty', [UserController::class, 'getDoctorsBySpecialty']);
    Route::post('processPayment',[UserController::class, 'processPayment']);
    Route::Post('/appointments/cancelappointment/{appointmentid}', [UserController::class, 'cancelAppointment']);

});

//------Doctor Module -----
Route::middleware(['doctor'])->group(function(){
    //--------Routes for Doctors only --------
    Route::get('/doctor/medicalrecords/{patientid}', [DoctorController::class, 'patientMedicalRecords']);
    Route::get('/doctor/allappointments', [DoctorController::class, 'getAllAppointments']);
    Route::get('/doctor/todaysappointments', [DoctorController::class, 'getTodaysAppointments']);
    Route::post('addMedicalRecord/{id}',[DoctorController::class,'addMedicalRecord']);
    Route::put('updateMedicalRecord/{id}',[DoctorController::class,'updateMedicalRecord']);
   
    Route::post('manageAppointments/{appointmentId}' , [DoctorController::class,'manageAppointments']);

      //------Routes for both Doctors and labstaff--------
    Route::get('viewlabtests/{patientid}',[DoctorController::class,'viewLabtests']); //view patient's labtest for lab staff and doctors
    Route::get('/doctor/searchPatient', [DoctorController::class, 'searchPatient']);
    Route::get('/doctor/showpatients', [UserController::class, 'showPatients']);

      //------For lab staff only--------
    Route::post('addLabtests/{id}',[LabTestController::class,'addLabtests']);
  
    //--------Routes for only Pharmacists----------
    Route::post('/pharmacist/addmedicine', [PharmacistController::class, 'addmedicine']);
    Route::get('/pharmacist/showmedicines', [PharmacistController::class, 'showMedicines']);
    Route::put('/pharmacist/updatemedicine/{id}', [PharmacistController::class, 'updateMedicine']);

});









