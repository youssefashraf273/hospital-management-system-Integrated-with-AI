<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LabTestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Test id'=>$this->id,
            'Test name'=> $this->test_name,
            'Description'=> $this->test_description,
            'Test Category'=>$this->test_category,
            'Value'=>$this->test_value,
            'Reference Range'=>$this->test_reference_range,
            'Additional Notes'=>$this->advices,
            'Performed at'=>$this->created_at ,
            'By Doctor'=>$this->doctor->name,
            



        ];
    }
}
