import { fetchMyLabTests } from "@/services/patient/labTests";
import { useQuery } from "@tanstack/react-query";

export const useMyLabTests = () => {
  return useQuery({
    queryKey: ["patientDoctors"],
    queryFn: () => fetchMyLabTests(),
  });
};
