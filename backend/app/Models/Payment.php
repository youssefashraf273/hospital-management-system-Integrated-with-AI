<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'card_number',
        'card_expire_date',
        'card_type',
        'card_holder_name',
        'transaction_amount',
        'card_cvv',
        'user_id',
        'appointment_id',
    ];

    public function appointment(){
        return $this->belongsTo(Appointment::class);
    }
}
