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
  Badge,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useMobile } from "@/hooks/useMobile";
import { Link, useNavigate } from "react-router-dom";
import { Patient, User } from "@/types";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};
type Props = {
  patients?: Patient[];
};

export default function LabTestsChooseList({ patients }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
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
      <div className="space-y-4">
        {paginatedPatients.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No patients found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedPatients.map((patient) => (
              <Card
                key={patient["Patient id"]}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 py-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-teal-100">
                      <AvatarImage src={"/placeholder.svg"} alt={patient.Name} />
                      <AvatarFallback className="bg-teal-50 text-teal-700">
                        {getInitials(patient.Name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{patient.Name}</h3>
                      <p className="text-gray-500">Age: {patient.Age}</p>
                      {/* <div className="flex items-center gap-1 mt-1">
                      <StarRating maxRating={5} rating={doctor.rating} />
                      <span className="text-sm font-medium">{doctor?.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({doctor.reviewCount} reviews)
                      </span>
                    </div> */}
                    </div>
                    <Button
                      className="ml-auto py-5 self-center tet-3xl font-bold bg-teal-600 hover:bg-teal-700"
                      onClick={() =>
                        navigate(
                          `/dashboard/doctors/patients/${patient["Patient id"]}/lab-tests/`
                        )
                      }
                    >
                      View Lab tests
                      <span>
                        <ArrowRight />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
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
