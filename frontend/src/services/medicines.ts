import { authAxios } from "@/lib/authAxios";
import { Medicine } from "@/types";

export const getMedicines = async (): Promise<Medicine[]> => {
  const response = await authAxios.get("/pharmacist/showmedicines");
  return response.data.medicines;
};
