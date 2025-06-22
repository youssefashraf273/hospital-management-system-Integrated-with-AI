import { useState } from "react";
// import { Button } from "@/components/ui/button"
// import { PlusCircle } from "lucide-react"
import PatientsListSkeleton from "@/components/Doctor/Patient/PatientsListSkeleton";
import CardContainer from "@/components/ui/CardContainer";
import { useSearchPatients } from "@/hooks/doctor/usePatients";
import { PatientFilters } from "@/types";
import LabTestsChooseList from "@/components/Doctor/Patient/PatientLabRecords";

export default function AllLabTests() {
  const [filters] = useState<PatientFilters>({
    search: "",
  });

  const { data: patientsData, isFetching, isError } = useSearchPatients(filters);

  console.log(patientsData);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Lab Tests </h1>
          <p className="text-muted-foreground">
            Choose a patient to view their lab tests
          </p>
        </div>
      </div>

      <CardContainer>
        {isFetching ? (
          <PatientsListSkeleton />
        ) : isError ? (
          <div>Error</div>
        ) : (
          <LabTestsChooseList patients={patientsData} />
        )}
      </CardContainer>
    </div>
  );
}
