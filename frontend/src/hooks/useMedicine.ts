import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authAxios } from "@/lib/authAxios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MedicineFormData } from "@/types";

export const useCreateMedicine = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: MedicineFormData) => {
      const response = await authAxios.post("/pharmacist/addmedicine", {
        medicine_name: data.name,
        medicine_price: data.price,
        medicine_quantity: data.quantity,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Medicine added successfully!");
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      navigate("/medicines");
    },
    onError: (error: any) => {
      toast.error("Failed to add medicine", {
        description: error?.response?.data?.message || "Unexpected error occurred.",
      });
    },
  });
};

export const useUpdateMedicine = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: MedicineFormData }) => {
      const response = await authAxios.put(`/pharmacist/updatemedicine/${id}`, {
        medicine_name: data.name,
        medicine_price: data.price,
        medicine_quantity: data.quantity,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Medicine updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      navigate("/medicines");
    },
    onError: (error: any) => {
      toast.error("Failed to update medicine", {
        description: error?.response?.data?.message || "Unexpected error occurred.",
      });
    },
  });
};
