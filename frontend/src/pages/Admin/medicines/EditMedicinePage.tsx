import MedicineForm, { MedicineFormData } from "@/components/Doctor/MedicineForm";
import LoadingDiv from "@/components/LoadingDiv";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateMedicine } from "@/hooks/useMedicine";
import { useMedicines } from "@/hooks/useMedicines";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMedicinePage() {
  const navigate = useNavigate();
  const updateMedicine = useUpdateMedicine();
  const { id } = useParams<{ id: string }>();

  const { data, isFetching } = useMedicines();

  const medicine = data?.find((medicine) => String(medicine.id) === id);

  const handleSubmit = async (data: MedicineFormData) => {
    await updateMedicine.mutateAsync({ id: id as string, data });
    navigate("/medicines");
  };

  if (isFetching) return <LoadingDiv />;
  if (!medicine) return <div>Medicine not found</div>;

  return (
    <Card className="max-w-3xl mt-10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Edit Medicine</CardTitle>
        <CardDescription>Update the medicine details and stock</CardDescription>
      </CardHeader>
      <MedicineForm
        initialData={medicine}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/medicines")}
        isLoading={updateMedicine.isPending}
        submitLabel="Edit Medicine"
      />
    </Card>
  );
}
