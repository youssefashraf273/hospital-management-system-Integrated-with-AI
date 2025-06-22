import { authAxios } from "@/lib/authAxios";
import { Doctor } from "@/types";

export const getDoctors = async (): Promise<Doctor[]> => {
  const response = await authAxios.get("/showDoctors");
  return response.data;
};
