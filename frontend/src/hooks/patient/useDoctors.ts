import { getPatientDoctors } from "@/services/patient/doctors";
import { DoctorFilters } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useDoctors = (filters: DoctorFilters) => {
  return useQuery({
    queryKey: ["patientDoctors"],
    queryFn: () => getPatientDoctors(filters),
  });
};
