<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DoctorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Doctor id'=>$this->id,
            'Name'=>$this->name,
            'Speciality'=>$this->speciality,
            'Phone number'=>$this->phone,
            'From'=>$this->from,
            'To'=>$this->to,
        ];
    }
}
