import { authAxios } from "@/lib/authAxios";
import { DoctorFormData } from "@/pages/Admin/AddDoctorPage";
import { getDoctors } from "@/services/doctors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: DoctorFormData) => {
      const response = await authAxios.post("/addAdmin", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Admin created successfully");
      queryClient.invalidateQueries({ queryKey: ["admins"] });
      navigate("/dashboard/admin");
    },
  });
};
