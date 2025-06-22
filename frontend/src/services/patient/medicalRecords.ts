import { authAxios } from "@/lib/authAxios";
import { MedicalRecords } from "@/types";

export const fetchMyMedicalRecords = async (): Promise<MedicalRecords[]> => {
  const response = await authAxios.get("/patient/medicalrecords");
  return response.data.medical_records;
};
