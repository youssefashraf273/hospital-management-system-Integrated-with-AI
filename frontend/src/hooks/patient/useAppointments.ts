import { getTodayAppointmnets } from "@/services/patient/appointments";
import { useQuery } from "@tanstack/react-query";

export const useTodayAppointments = () => {
  return useQuery({
    queryKey: ["todayAppointments"],
    queryFn: () => getTodayAppointmnets(),
  });
};
