import { Button } from "@/components/ui/button";
import { ArrowLeft, FilePlus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MedicalRecordsList from "@/components/Doctor/MedicalRecords/medicalRecordsList";
import { useGetPatientMedicalRecords } from "@/hooks/doctor/usePatientMedicalRecords";
import MedicalRecordsListSkeleton from "@/components/Patient/MedicalRecordsListSkeleton";

export default function PatientMedicalRecordsPage() {
  const { patientId } = useParams();

  const { data: patient, isFetching, isError } = useGetPatientMedicalRecords(patientId);

  if (isFetching) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button
                disabled={isFetching}
                variant="ghost"
                size="sm"
                asChild
                className="h-8 w-8 p-0"
              >
                <Link to={`/dashboard/doctors/patients/${patient?.patient.FullName}`}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to patient profile</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
            </div>
            <p className="text-gray-500">
              Viewing medical history for{" "}
              <span className="font-medium">{patient?.patient?.FullName}</span>
            </p>
          </div>
          <Button disabled={isFetching} asChild className="bg-teal-600 hover:bg-teal-700">
            <Link
              to={`/dashboard/doctors/patients/${patient?.patient?.id}/medical-records/new`}
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Add Medical Record
            </Link>
          </Button>
        </div>

        <MedicalRecordsListSkeleton />
      </div>
    );
  }
  if (isError) {
    return <div>error</div>;
  }
  if (!patient) {
    return <div>not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <Link to={`/dashboard/doctors/patients/${patient.patient.FullName}`}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to patient profile</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          </div>
          <p className="text-gray-500">
            Viewing medical history for{" "}
            <span className="font-medium">{patient.patient.FullName}</span>
          </p>
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link
            to={`/dashboard/doctors/patients/${patient.patient.id}/medical-records/new`}
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Add Medical Record
          </Link>
        </Button>
      </div>

      <MedicalRecordsList
        medicalRecords={patient.medicalRecords}
        patientId={patient.patient.id}
      />
    </div>
  );
}
