import { fetchPatientMedicalRecords } from "@/services/doctor/patientMedicalRecordsRequest";
import { useQuery } from "@tanstack/react-query";

export const useGetPatientMedicalRecords = (id?: string) => {
  return useQuery({
    queryKey: ["patientMedicalRecords", id],
    queryFn: () => fetchPatientMedicalRecords(id),
    enabled: !!id,
  });
};
