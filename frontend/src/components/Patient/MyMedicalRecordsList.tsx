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
import { Calendar, Eye, FileText, Search } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MedicalRecords } from "@/types";

interface PatientMedicalRecordsListProps {
  medicalRecords: MedicalRecords[];
}

export default function MyMedicalRecordsList({
  medicalRecords,
}: PatientMedicalRecordsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter medical records for this patient from dummy data

  // Filter medical records based on search query and active tab
  const filteredRecords = medicalRecords.filter((record) => {
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

    return true;
  });

  // Sort records by date (newest first)
  const sortedRecords = [...filteredRecords].sort(
    (a, b) =>
      new Date(b["Diagnosed at"]).getTime() - new Date(a["Diagnosed at"]).getTime()
  );

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = sortedRecords.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
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
                : "You don't have any medical records in our system yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-6">
            {paginatedRecords.map((record) => (
              <Card
                key={record["Record id"]}
                className="overflow-hidden border-l-4 border-l-blue-500"
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
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">Symptoms</h4>
                      <p className="mt-1">{record["Symptoms"]}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">Doctor</h4>
                      <p className="mt-1">
                        Dr. {record["Doctor"]}
                        {/* ({record.doctor_speciality}) */}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500">
                        Prescribed Medication
                      </h4>
                      <p className="mt-1">{record["Prescribed medication"]}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/patient/medical-records/${record["Record id"]}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
