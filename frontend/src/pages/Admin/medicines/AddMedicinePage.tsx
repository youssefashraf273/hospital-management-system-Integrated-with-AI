import MedicineForm, { MedicineFormData } from "@/components/Doctor/MedicineForm";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateMedicine } from "@/hooks/useMedicine";
import { useNavigate } from "react-router-dom";

export default function AddMedicinePage() {
  const navigate = useNavigate();
  const createMutation = useCreateMedicine();

  const handleSubmit = async (data: MedicineFormData) => {
    await createMutation.mutateAsync(data);
    navigate("/medicines");
  };

  return (
    <Card className="max-w-3xl mt-10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Add New Medicine</CardTitle>
        <CardDescription>Add a new medicine</CardDescription>
      </CardHeader>
      <MedicineForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/medicines")}
        isLoading={createMutation.isPending}
        submitLabel="Add Medicine"
      />
    </Card>
  );
}
