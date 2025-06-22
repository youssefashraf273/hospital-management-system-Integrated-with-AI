"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { Calendar, Eye, FileText, Search, TestTube } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { LabTests } from "@/types";

interface PatientLabTestsListProps {
  labTests: LabTests[];
}

// Mock data based on the provided database schema

export default function PatientLabTestsList({ labTests }: PatientLabTestsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter lab tests for this patient from dummy data

  // Filter lab tests based on search query and active tab
  const filteredTests = labTests.filter((test) => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        test.test_name.toLowerCase().includes(query) ||
        test.test_category.toLowerCase().includes(query) ||
        test.test_description.toLowerCase().includes(query) ||
        test.doctor_name.toLowerCase().includes(query)
      );
    }

    // Apply tab filter
    if (activeTab === "all") {
      return true;
    } else if (activeTab === "recent") {
      // Show tests from the last 3 months
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return new Date(test.created_at) >= threeMonthsAgo;
    } else if (activeTab === "abnormal") {
      return test.is_abnormal;
    }

    return true;
  });

  // Sort tests by date (newest first)
  const sortedTests = [...filteredTests].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Pagination
  const totalPages = Math.ceil(sortedTests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTests = sortedTests.slice(startIndex, startIndex + itemsPerPage);

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
              <TabsTrigger value="all">All Tests</TabsTrigger>
              <TabsTrigger value="recent">Recent (3 months)</TabsTrigger>
              <TabsTrigger value="abnormal">Abnormal Results</TabsTrigger>
            </TabsList>
          </Tabs>

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
                key={test.id}
                className="overflow-hidden border-l-4 border-l-blue-500"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span>{test.test_name}</span>
                        {test.is_abnormal && (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            Abnormal
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{format(new Date(test.created_at), "MMMM d, yyyy")}</span>
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
                      <p>{test.test_category}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">
                        Ordered By
                      </h4>
                      <p>Dr. Kerollos Sameh</p>
                    </div>
                    <div>
                      <h4
                        className={`font-medium text-sm ${
                          test.test_value > test.test_reference_range
                            ? "text-red-500"
                            : "text-gray-500"
                        } mb-1`}
                      >
                        test Value
                      </h4>
                      <p>{test.test_value}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">
                        Reference
                      </h4>
                      <p>{test.test_reference_range}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 pt-2 border-t flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" />
                    <span
                      className={`${
                        test.test_value > test.test_reference_range
                          ? "text-red-500"
                          : "text-gray-500"
                      } `}
                    >
                      {test.test_reference_range < test.test_value
                        ? "This test contains results outside the normal range."
                        : "All results are within normal range."}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/dashboard/doctors/lab-tests/${test.id}`}>
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
