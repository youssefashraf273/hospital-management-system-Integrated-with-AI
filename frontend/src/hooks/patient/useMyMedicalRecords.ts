import { fetchMyMedicalRecords } from "@/services/patient/medicalRecords";
import { useQuery } from "@tanstack/react-query";

export const useMyMedicalRecords = () => {
  return useQuery({
    queryKey: ["patientDoctors"],
    queryFn: () => fetchMyMedicalRecords(),
  });
};
