import MedicalRecordsSkeleton from "@/components/Doctor/Appointments/ApointmentsSkeleton";
import MedicalRecordDetails from "@/components/Patient/MedicalRecordDetails";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMyMedicalRecords } from "@/hooks/patient/useMyMedicalRecords";
import { FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function MedicalRecordDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: medicalRecords, isFetching } = useMyMedicalRecords();

  const medicalRecord = medicalRecords?.find(
    (record) => String(record["Record id"]) === id
  );

  if (!medicalRecord && !isFetching) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-red-100 p-3">
            <FileText className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Medical Record Not Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The medical record you're looking for doesn't exist or you don't have
            permission to view it.
          </p>
          <Button className="mt-4" onClick={() => navigate("/patient/medical-records")}>
            Back to Medical Records
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isFetching ? (
        <MedicalRecordsSkeleton />
      ) : (
        <MedicalRecordDetails medicalRecord={medicalRecord} />
      )}
    </div>
  );
}
