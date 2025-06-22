<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            ' id'=>$this->id,
            'Doctor'=>$this->doctor->name,
            'Patient'=>$this->user->FullName,
            'Date'=>$this->date,
            'Status'=>$this->status,
        ];
    }
}
