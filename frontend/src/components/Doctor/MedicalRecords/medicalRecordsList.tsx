import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Edit, FileText, Search, Trash2 } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { MedicalRecords } from "@/types";

interface MedicalRecordsListProps {
  medicalRecords: MedicalRecords[];
  patientId: string;
}

export default function MedicalRecordsList({
  medicalRecords,
  patientId,
}: MedicalRecordsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Get medical records for this patient
  const allMedicalRecords = medicalRecords || [];

  // Filter records based on search query and active tab
  const filteredRecords = allMedicalRecords.filter((record) => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        record["Diagnose"].toLowerCase().includes(query) ||
        record["Symptoms"].toLowerCase().includes(query) ||
        record["Prescribed medication"].toLowerCase().includes(query) ||
        record["Additional notes"].toLowerCase().includes(query) ||
        record["Doctor"].toLowerCase().includes(query)
      );
    }

    // Apply tab filter
    if (activeTab === "all") {
      return true;
    } else if (activeTab === "recent") {
      // Show records from the last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return new Date(record["Diagnosed at"]) >= sixMonthsAgo;
    }

    return true;
  });

  // Sort records by date (newest first)
  const sortedRecords = [...filteredRecords].sort(
    (a, b) =>
      new Date(b["Diagnosed at"]).getTime() - new Date(a["Diagnosed at"]).getTime()
  );

  const handleDeleteClick = (recordId: string) => {
    setRecordToDelete(recordId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    // if (!recordToDelete) return
    // setIsDeleting(true)
    // try {
    //   await deleteMedicalRecord(recordToDelete)
    //   toast({
    //     title: "Record deleted",
    //     description: "The medical record has been successfully deleted.",
    //   })
    //   router.refresh()
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to delete the medical record. Please try again.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setIsDeleting(false)
    //   setIsDeleteDialogOpen(false)
    //   setRecordToDelete(null)
    // }
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Tabs
            defaultValue="all"
            className="w-full sm:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="recent">Recent (6 months)</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search records..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {searchQuery && (
          <div className="text-sm text-gray-500">
            Found {sortedRecords.length} record{sortedRecords.length !== 1 ? "s" : ""}{" "}
            matching &quot;{searchQuery}
            &quot;
          </div>
        )}
      </div>

      {sortedRecords.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3">
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No medical records found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "Try adjusting your search query."
                : "This patient doesn't have any medical records yet."}
            </p>
            <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700">
              <Link to={`/dashboard/doctors/patients/${patientId}/medical-records/new`}>
                Add Medical Record
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {sortedRecords.map((record) => (
            <Card
              key={record["Record id"]}
              className="overflow-hidden border-l-4 border-l-teal-500"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span>{record["Diagnose"]}</span>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {format(new Date(record["Diagnosed at"]), "MMMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <Link
                        to={`/dashboard/doctors/patients/${patientId}/medical-records/${record["Record id"]}/edit`}
                      >
                        <span className="sr-only">Edit</span>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteClick(record["Record id"])}
                    >
                      <span className="sr-only">Delete</span>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Symptoms</h4>
                    <p>{record["Symptoms"]}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">
                      Prescribed Medication
                    </h4>
                    <p>{record["Prescribed medication"]}</p>
                  </div>
                </div>

                {record["Additional notes"] && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Notes</h4>
                    <p className="text-gray-700">{record["Additional notes"]}</p>
                  </div>
                )}

                <div className="text-sm text-gray-500 pt-2 border-t">
                  Recorded by: <span className="font-medium">{record["Doctor"]}</span>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link
                    to={`/dashboard/doctors/patients/${record["doctor_id"]}/medical-records/${record["Record id"]}`}
                  >
                    View Full Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this record?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the medical
              record from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <>
                  <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
