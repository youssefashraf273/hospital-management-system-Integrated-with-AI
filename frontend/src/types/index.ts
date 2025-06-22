export interface User {
  id: string;
  FullName: string;
  email: string;
  email_verified_at?: string | null;
  age: number;
  gender: "male" | "female";
  phone: string | number;
  created_at: string;
  role: "user" | "admin" | "doctor";
  updated_at: string;
}

export interface Patient {
  "Patient id": string;
  Name: string;
  Email: string;
  Age: number;
  Gender: "male" | "female";
  Phone: string | number;
}

export interface Doctor {
  "Doctor id": number;
  Name: string;
  "Phone number": string;
  Speciality: string;
  From: string;
  To: string;
  avatar?: string;
  availableSlots: number;
  rating: number;
  reviewCount: number;
}
export interface LoginResponse {
  message: string;
  "user data": User;
  token: string;
  role: string;
}
export interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

export interface AuthCheckResponse {
  user: User;
  role?: "user" | "admin" | "doctor";
  message: string;
}

export interface Medicine {
  id: string;
  medicine_name: string;
  medicine_price: number;
  medicine_quantity: number;
}
export interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  speciality: string;
  from: string;
  to: string;
}
export interface MedicineFormData {
  name: string;
  quantity: number;
  price: number;
}

export interface Appointment {
  id: string;
  Doctor: Doctor;
  Patient: User;
  Date: string;
  notes?: string;
  Status: string;
}
export type PatientFilters = {
  search?: string;
};

export type DoctorFilters = {
  speciality?: string;
};

export type LabTests = {
  "Test id": string;
  "Test name": string;
  Description: string;
  "Test Category": string;
  Value: string;
  "Reference Range": string;
  "Additional Notes": string;
  "Performed at": string;
  "By Doctor": string;
};
export type MedicalRecords = {
  "Record id": string;
  doctor_id: string;
  "Additional notes": string;
  "Diagnosed at": string;
  "Prescribed medication": string;
  Symptoms: string;
  Doctor: string;
  Diagnose: string;
};

export type medicalRecordsResponse = {
  medicalRecords: MedicalRecords[];
  patient: User;
};
