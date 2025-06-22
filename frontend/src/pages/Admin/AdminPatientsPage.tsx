import { useState } from "react";
// import { Button } from "@/components/ui/button"
// import { PlusCircle } from "lucide-react"
import PatientsListSkeleton from "@/components/Doctor/Patient/PatientsListSkeleton";
import PatientsList from "@/components/Doctor/Patient/PatientsList";
import CardContainer from "@/components/ui/CardContainer";
import { PatientFilters } from "@/types";
import { useSearchAllPatients } from "@/hooks/admin/useShowAllPatients";

export default function AdminPatientsPage() {
  const [filters, setFilters] = useState<PatientFilters>({
    search: "",
  });

  const { data: patientsData, isFetching, isError } = useSearchAllPatients(filters);

  console.log(patientsData);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Patients</h1>
          <p className="text-muted-foreground">
            Manage All patients and view their medical records
          </p>
        </div>
      </div>

      <CardContainer>
        {isFetching ? (
          <PatientsListSkeleton />
        ) : isError ? (
          <div>Error</div>
        ) : (
          <PatientsList patients={patientsData} />
        )}
      </CardContainer>
    </div>
  );
}
