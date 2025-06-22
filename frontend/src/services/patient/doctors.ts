import { authAxios } from "@/lib/authAxios";
import { Doctor, DoctorFilters } from "@/types";

export interface PatientDoctorsResponse {
  doctors: Doctor[];
}
export const getPatientDoctors = async (
  filters: DoctorFilters
): Promise<PatientDoctorsResponse> => {
  const params = new URLSearchParams();

  if (filters.speciality) {
    params.append("speciality", filters.speciality);
  }

  const response = await authAxios.get(`/doctors?${params.toString()}`);
  return response.data;
};
