import MyLabTestDetails from "@/components/Patient/MyLabTestDetails";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

export default function MyLabTestDetailsPage() {
  const [urlSearchParams] = useSearchParams();

  const id = urlSearchParams.get("id");

  if (!id) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lab Test Details</h1>
          <p className="text-gray-500 mt-1">Lab Test not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <MyLabTestDetails testId={id} />
      </Suspense>
    </div>
  );
}
