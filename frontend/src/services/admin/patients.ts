import { authAxios } from "@/lib/authAxios";
import { User, PatientFilters, Patient } from "@/types";

export const searchAllPatients = async (filters?: PatientFilters): Promise<Patient[]> => {
  const params = new URLSearchParams();

  if (filters?.search) {
    params.append("search", filters.search);
  }

  const response = await authAxios.get(`/admin/showPatients?${params.toString()}`);
  return response.data.Patients;
};
