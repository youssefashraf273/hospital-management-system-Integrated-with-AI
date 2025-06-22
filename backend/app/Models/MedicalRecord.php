<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'doctor_id',
        'diagnosis',
        'symptoms',
        'prescribed_medication',
        'notes',
    ];


    public function doctor(){
        return $this->belongsTo(Doctor::class);
}
public function patient(){                       //Medical record belongs to one patient
    return $this->belongsTo(User::class);
}

}
