import { authAxios } from "@/lib/authAxios";
import { DoctorFormData } from "@/pages/Admin/AddDoctorPage";
import { getDoctors } from "@/services/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useDoctors = () => {
  return useQuery({
    queryKey: ["AdminDoctors"],
    queryFn: getDoctors,
  });
};
export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: DoctorFormData) => {
      const response = await authAxios.post("/addDoctor", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Doctor created successfully");
      queryClient.invalidateQueries({ queryKey: ["AdminDoctors"] });
      navigate("/admin/doctors");
    },
  });
};
