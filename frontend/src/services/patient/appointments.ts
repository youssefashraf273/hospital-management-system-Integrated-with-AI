import { authAxios } from "@/lib/authAxios";

export const getAllAppointmnets = async () => {
  const response = await authAxios.get("/patient/allappointments");
  return response.data;
};
export const getTodayAppointmnets = async () => {
  const response = await authAxios.get("/patient/todaysappointments");
  return response.data;
};
