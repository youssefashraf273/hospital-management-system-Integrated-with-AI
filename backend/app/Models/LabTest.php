<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'doctor_id',
        'test_name',
        'test_description',
        'test_category',
        'test_reference_range',
        'test_value',
        'advices',
    ];
    public function doctor(){                       //Lab test belongs to one doctor
        return $this->belongsTo(Doctor::class);
    }
    public function patient(){                       //Lab test belongs to one patient
        return $this->belongsTo(User::class);
    }

}
