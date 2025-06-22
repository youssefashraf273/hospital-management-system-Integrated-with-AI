import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import MedicinesList from "./Medicineslist";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function MedicinesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medicines Management</h1>
          <p className="text-gray-500 mt-1">View all medicines in the system</p>
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link to="/medicines/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Medicine
          </Link>
        </Button>
      </div>
      <Separator className="mb-8" />

      <Suspense fallback={<MedicinesListSkeleton />}>
        <MedicinesList />
      </Suspense>
    </div>
  );
}

function MedicinesListSkeleton() {
  return (
    <div className="rounded-lg border shadow animate-pulse">
      <div className="p-4">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4 border-b last:border-0"
            >
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
