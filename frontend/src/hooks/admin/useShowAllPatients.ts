import { searchAllPatients } from "@/services/admin/patients";
import { PatientFilters } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSearchAllPatients = (filters?: PatientFilters) => {
  return useQuery({
    queryKey: ["Patients"],
    queryFn: () => searchAllPatients(filters),
  });
};
