<?php

namespace App\Http\Resources;
use App\Models\MedicalRecord; 
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicalRecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'Record id'=>$this->id ,
            'Doctor'=>$this->doctor->name,
            'Diagnose' => $this->diagnosis, 
            'Symptoms'=> $this->symptoms,
            'Prescribed medication'=>$this->prescribed_medication ,
            'Diagnosed at'=>$this->created_at,
            'Additional notes'=>$this->notes,
              
        ];
    }
}
