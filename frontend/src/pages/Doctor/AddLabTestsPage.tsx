import LabTestForm from "@/components/Doctor/Appointments/LabTestForm";
import { Button } from "@/components/ui/button";
import { useSearchPatients } from "@/hooks/doctor/usePatients";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function AddLabTestPage() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const { data: patients } = useSearchPatients();
  const patient = patients?.find(
    (patient) => String(patient["Patient id"]) === patientId
  );

  console.log(patients, patientId);

  if (!patientId || !patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
          <Link to={`/dashboard/doctors/patients/${patientId}/lab-tests`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Patient labtests</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add Lab test</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium">Patient: {patient.Name}</h2>
        <p className="text-gray-500">
          {patient.Gender}, {patient.Age} years old
        </p>
      </div>

      <LabTestForm
        patientId={patientId}
        onClose={() => navigate(`/dashboard/doctors/patients/${patientId}/lab-tests`)}
      />
    </div>
  );
}
