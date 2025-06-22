import MedicalRecordsListSkeleton from "@/components/Patient/MedicalRecordsListSkeleton";
import MyMedicalRecordsList from "@/components/Patient/MyMedicalRecordsList";
import { useMyMedicalRecords } from "@/hooks/patient/useMyMedicalRecords";

export default function MyMedicalRecordsPage() {
  const { data, isFetching } = useMyMedicalRecords();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Medical Records</h1>
        <p className="text-gray-500 mt-1">View your medical records and history</p>
      </div>

      {isFetching ? (
        <MedicalRecordsListSkeleton />
      ) : (
        <MyMedicalRecordsList medicalRecords={data || []} />
      )}
    </div>
  );
}
