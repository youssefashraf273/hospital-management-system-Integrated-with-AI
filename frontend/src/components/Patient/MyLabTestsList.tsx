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
import { Calendar, Eye, FileText, Search, TestTube } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { LabTests } from "@/types";

interface PatientLabTestsListProps {
  labTests: LabTests[];
}

export default function MyLabTestsList({ labTests }: PatientLabTestsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter lab tests for this patient from dummy data

  // Filter lab tests based on search query and active tab
  const filteredTests = labTests.filter((test) => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        test["Test name"].toLowerCase().includes(query) ||
        test["Test Category"].toLowerCase().includes(query) ||
        test["Description"].toLowerCase().includes(query) ||
        test["By Doctor"].toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Sort tests by date (newest first)
  const sortedTests = [...filteredTests].sort(
    (a, b) =>
      new Date(b["Performed at"]).getTime() - new Date(a["Performed at"]).getTime()
  );

  // Pagination
  const totalPages = Math.ceil(sortedTests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTests = sortedTests.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search lab tests..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {searchQuery && (
          <div className="text-sm text-gray-500">
            Found {sortedTests.length} test{sortedTests.length !== 1 ? "s" : ""} matching
            &quot;{searchQuery}&quot;
          </div>
        )}
      </div>

      {sortedTests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3">
              <TestTube className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No lab tests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? "Try adjusting your search query."
                : "You don't have any lab tests in our system yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-6">
            {paginatedTests.map((test) => (
              <Card
                key={test["Test id"]}
                className="overflow-hidden border-l-4 border-l-blue-500"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span>{test["Test name"]}</span>
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {format(new Date(test["Performed at"]), "MMMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">
                        Test Category
                      </h4>
                      <p>{test["Test Category"]}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">
                        Ordered By
                      </h4>
                      <p>Dr. {test["By Doctor"]}</p>
                    </div>
                    <div>
                      <h4
                        className={`font-medium text-sm ${
                          test["Value"] > test["Reference Range"]
                            ? "text-red-500"
                            : "text-gray-500"
                        } mb-1`}
                      >
                        test Value
                      </h4>
                      <p>{test["Value"]}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">
                        Reference
                      </h4>
                      <p>{test["Reference Range"]}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 pt-2 border-t flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" />
                    <span
                      className={`${
                        test["Value"] > test["Reference Range"]
                          ? "text-red-500"
                          : "text-gray-500"
                      } `}
                    >
                      {test["Reference Range"] < test["Value"]
                        ? "This test contains results outside the normal range."
                        : "All results are within normal range."}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/patient/lab-tests/${test["Test id"]}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Results
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
