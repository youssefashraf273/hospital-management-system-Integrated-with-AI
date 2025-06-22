import { searchPatients } from "@/services/doctor/patientsRequests";
import { PatientFilters } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSearchPatients = (filters?: PatientFilters) => {
  return useQuery({
    queryKey: ["Patients"],
    queryFn: () => searchPatients(filters),
  });
};
