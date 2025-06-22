import { Suspense } from "react";
import MyLabTestsList from "@/components/Patient/MyLabTestsList";
import PatientLabTestsListSkeleton from "@/components/Patient/MyLabTestsSkeleton";
import { useMyLabTests } from "@/hooks/patient/UseMyLabTests";

export default function MyLabTestsPage() {
  const { data, isFetching } = useMyLabTests();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Lab Tests</h1>
        <p className="text-gray-500 mt-1">View your lab test results and history</p>
      </div>

      {isFetching ? (
        <PatientLabTestsListSkeleton />
      ) : (
        <MyLabTestsList labTests={data || []} />
      )}
    </div>
  );
}
