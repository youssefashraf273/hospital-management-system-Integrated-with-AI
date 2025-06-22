import { authAxios } from "@/lib/authAxios";
import { LabTests } from "@/types";

export const fetchMyLabTests = async (): Promise<LabTests[]> => {
  const response = await authAxios.get("/patient/labtests");
  return response.data.medical_records;
};
