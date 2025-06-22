import { getAllAppointmnets, getTodayAppointmnets } from "@/services/doctor/appointments";
import { useQuery } from "@tanstack/react-query";

export const useDoctorTodayAppointments = () => {
  return useQuery({
    queryKey: ["todayAppointments"],
    queryFn: () => getTodayAppointmnets(),
  });
};

export const useDoctorAllAppointments = () => {
  return useQuery({
    queryKey: ["allAppointments"],
    queryFn: () => getAllAppointmnets(),
  });
};
