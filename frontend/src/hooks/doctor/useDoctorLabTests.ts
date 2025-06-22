import { fetchAllLabTests } from "@/services/doctor/AllLabTestsRequest";
import { useQuery } from "@tanstack/react-query";

export const useDoctorLabTests = (patientId?: string) => {
  return useQuery({
    queryKey: ["LabTests"],
    queryFn: () => fetchAllLabTests(patientId),
    enabled: !!patientId,
  });
};
