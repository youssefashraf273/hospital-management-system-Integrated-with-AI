<?php

namespace App\Http\Resources;
use App\Models\User; 
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Patient id'=>$this->id,
            'Name' => $this->FullName, 
            'Email'=> $this->email,
            'Age'=>$this->age ,
            'Gender'=>$this->gender,
            'Phone'=>$this->phone ,
            'Joined at' => $this->created_at ,
            
        ];
    }
}
