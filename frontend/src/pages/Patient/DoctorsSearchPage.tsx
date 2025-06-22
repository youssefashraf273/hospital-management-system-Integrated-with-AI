import { useState } from "react";
import DoctorsList from "@/components/Patient/DoctorsList";
import DoctorsListSkeleton from "@/components/Patient/DoctorsListSkeleton";
import { useDoctors } from "@/hooks/patient/useDoctors";

export default function DoctorsPage() {
  const [filters, setFilters] = useState({
    speciality: "",
  });

  const { data: doctorsData, isFetching } = useDoctors(filters);

  console.log(doctorsData);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
        <p className="text-gray-500 mt-1">
          Browse and book appointments with our healthcare professionals
        </p>
      </div>

      {isFetching && <DoctorsListSkeleton />}
      {doctorsData && <DoctorsList doctors={doctorsData.doctors} />}
      {/* <Suspense fallback={<DoctorsListSkeleton />}> */}
      {/* <DoctorsList /> */}
      {/* </Suspense> */}
    </div>
  );
}
