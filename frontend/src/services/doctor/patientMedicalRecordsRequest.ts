import { authAxios } from "@/lib/authAxios";
import { medicalRecordsResponse } from "@/types";

export const fetchPatientMedicalRecords = async (
  id?: string
): Promise<medicalRecordsResponse> => {
  const response = await authAxios.get(`/doctor/medicalrecords/${id}`);
  return {
    medicalRecords: response.data["Medical Records"],
    patient: response.data.patient,
  };
};
