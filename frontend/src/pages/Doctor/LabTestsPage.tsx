import PatientLabTestsList from "@/components/Doctor/LabTestsList";
import PatientLabTestsListSkeleton from "@/components/Patient/MyLabTestsSkeleton";
import { useDoctorLabTests } from "@/hooks/doctor/useDoctorLabTests";
import { useParams } from "react-router-dom";

export default function DoctorLabTestsPage() {
  const { patientId } = useParams();

  const { data, isFetching } = useDoctorLabTests(patientId);

  console.log(data);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Viewing Lab Tests of Ahmed Ali
        </h1>
        <p className="text-gray-500 mt-1">View your lab test results and history</p>
      </div>

      {isFetching ? (
        <PatientLabTestsListSkeleton />
      ) : (
        <PatientLabTestsList labTests={data || []} />
      )}
    </div>
  );
}
