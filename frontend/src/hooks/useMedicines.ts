import { useQuery } from "@tanstack/react-query";
import { getMedicines } from "@/services/medicines";

export const useMedicines = () => {
  return useQuery({
    queryKey: ["medicines"],
    queryFn: getMedicines,
  });
};
