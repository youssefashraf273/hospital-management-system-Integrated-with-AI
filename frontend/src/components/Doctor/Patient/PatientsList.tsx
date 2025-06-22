import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  FileText,
  Activity,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useMobile } from "@/hooks/useMobile";
import { Link } from "react-router-dom";
import { Patient, User } from "@/types";

type Props = {
  patients?: Patient[];
};

export default function PatientsList({ patients }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const isMobile = useMobile();
  const itemsPerPage = 5;

  const patientsData = patients || [];

  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch = patient.Name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  return (
    <div className="space-y-4 ">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p>
          Showing <span className="font-bold">{filteredPatients.length || 0}</span> of
          <span className="ml-1 font-bold">{patientsData.length}</span>
        </p>
      </div>

      {isMobile ? (
        // Mobile view - cards
        <div className="space-y-4">
          {paginatedPatients.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No patients found</p>
            </div>
          ) : (
            paginatedPatients.map((patient) => (
              <Card key={patient["Patient id"]}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{patient.Name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {patient["Patient id"]}
                      </p>
                    </div>
                    {/* <Badge
                      variant={patient.status === "Active" ? "default" : "secondary"}
                    >
                      {patient.status}
                    </Badge> */}
                  </div>

                  <div className="mt-2 space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Age:</span> {patient.Age}
                    </p>
                    {/* <p>
                      <span className="font-medium">Condition:</span>{" "}
                      {patient.medical_condition}
                    </p> */}
                    {/* <p>
                      <span className="font-medium">Last Visit:</span>{" "}
                      {new Date(patient.last_visit).toLocaleDateString()}
                    </p> */}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/dashboard/doctors/patients/${patient["Patient id"]}/medical-records`}
                    >
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link
                      to={`/dashboard/doctors/patients/${patient["Patient id"]}/lab-tests`}
                    >
                      <Button size="sm" variant="outline">
                        <Activity className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link
                      to={`/dashboard/doctors/patients/${patient["Patient id"]}/appointments`}
                    >
                      <Button size="sm" variant="outline">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedPatients.map((patient) => (
                  <TableRow key={patient["Patient id"]}>
                    <TableCell>{patient["Patient id"]}</TableCell>
                    <TableCell>{patient.Name}</TableCell>
                    <TableCell>{patient.Age}</TableCell>{" "}
                    <TableCell>{patient.Gender}</TableCell>
                    <TableCell>{patient.Phone}</TableCell>
                    {/* <TableCell>
                      {new Date(patient.last_visit).toLocaleDateString()}
                    </TableCell> */}
                    {/* <TableCell>
                      <Badge
                        variant={patient.status === "Active" ? "default" : "secondary"}
                      >
                        {patient.status}
                      </Badge>
                    </TableCell> */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/dashboard/doctors/patients/${patient["Patient id"]}`}>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </Link>
                        <Link
                          to={`/dashboard/doctors/patients/${patient["Patient id"]}/medical-records`}
                        >
                          <Button size="icon" variant="outline">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link
                          to={`/dashboard/doctors/patients/${patient["Patient id"]}/lab-tests`}
                        >
                          <Button size="icon" variant="outline">
                            <FlaskConical className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredPatients.length)} of{" "}
            {filteredPatients.length}
          </p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="hidden sm:inline-flex"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
