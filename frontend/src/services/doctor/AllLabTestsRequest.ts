import { authAxios } from "@/lib/authAxios";
import { LabTests } from "@/types";

export const fetchAllLabTests = async (patientId?: string): Promise<LabTests[]> => {
  const response = await authAxios.get(`viewlabtests/${patientId}`);
  return response.data.lab_tests;
};
