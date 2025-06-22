import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import BookAppointmentModal from "./BookAppointmentModal";
import { Doctor } from "@/types";
import StarRating from "../StarRating";

type Props = {
  doctors: Doctor[];
};
export default function DoctorsList({ doctors }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Use the local data directly instead of calling getDoctors()
  const allDoctors = useMemo(
    () =>
      doctors?.map((doctor) => ({
        ...doctor,
        reviewCount: Math.floor(Math.random() * 100),
        rating: parseFloat((Math.random() * 5).toFixed(1)),
        availableSlots: Math.floor(Math.random() * 19),
      })),
    [doctors]
  );

  // Get unique specialties for filter
  const specialties = Array.from(new Set(allDoctors.map((doctor) => doctor.Speciality)));

  // Filter doctors based on search query and specialty
  const filteredDoctors = allDoctors.filter((doctor) => {
    // Apply search filter (frontend search)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!doctor.Name.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Apply specialty filter
    if (specialtyFilter !== "all" && doctor.Speciality !== specialtyFilter) {
      return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + itemsPerPage);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="w-full sm:w-64">
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search doctors by name..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {(searchQuery || specialtyFilter !== "all") && (
          <div className="text-sm text-gray-500">
            Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
            {specialtyFilter !== "all" ? ` in ${specialtyFilter}` : ""}
            {searchQuery ? ` matching "${searchQuery}"` : ""}
          </div>
        )}
      </div>

      {paginatedDoctors.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium">No doctors found</h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedDoctors.map((doctor) => (
              <Card
                key={doctor["Doctor id"]}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 py-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-teal-100">
                      <AvatarImage
                        src={doctor.avatar || "/placeholder.svg"}
                        alt={doctor.Name}
                      />
                      <AvatarFallback className="bg-teal-50 text-teal-700">
                        {getInitials(doctor.Name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">Dr. {doctor.Name}</h3>
                      <p className="text-gray-500">{doctor.Speciality}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <StarRating maxRating={5} rating={doctor.rating} />
                        <span className="text-sm font-medium">{doctor?.rating}</span>
                        <span className="text-sm text-gray-500">
                          ({doctor.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 ">
                    {/* <div className="text-sm">
                      <span className="font-medium">Experience:</span> {doctor.experience}{" "}
                      years
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Languages:</span>{" "}
                      {doctor.languages.join(", ")}
                    </div> */}
                    <div className="flex flex-wrap gap-2">
                      {doctor.availableSlots > 0 ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {doctor.availableSlots} slots available
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                          No availability
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4 py-2">
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    disabled={doctor.availableSlots === 0}
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    {doctor.availableSlots > 0 ? "Book Appointment" : "Fully Booked"}
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

      {selectedDoctor && (
        <BookAppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          doctor={selectedDoctor}
        />
      )}
    </>
  );
}
