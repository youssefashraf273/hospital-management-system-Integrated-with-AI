import { authAxios } from "@/lib/authAxios";
import { Appointment } from "@/types";

export const getAllAppointmnets = async () => {
  const response = await authAxios.get("/doctor/allappointments");
  return response.data.appointments;
};
export const getTodayAppointmnets = async (): Promise<Appointment[]> => {
  const response = await authAxios.get("/doctor/todaysappointments");
  return response.data.appointments;
};
