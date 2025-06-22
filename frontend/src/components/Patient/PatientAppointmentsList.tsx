import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Search } from "lucide-react";
import { format, isPast } from "date-fns";
import { Link } from "react-router-dom";
import { Appointment } from "@/types";

interface PatientAppointmentsListProps {
  appointments: Appointment[];
}

export default function PatientAppointmentsList({
  appointments,
}: PatientAppointmentsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const allAppointments = appointments;

  const filteredAppointments = allAppointments.filter((appointment) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        appointment.Doctor.name.toLowerCase().includes(query) ||
        appointment.Doctor.speciality.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all" && appointment.Status !== statusFilter) {
      return false;
    }

    return true;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const aIsPast = isPast(new Date(a.Date));
    const bIsPast = isPast(new Date(b.Date));

    if (aIsPast && !bIsPast) return 1;
    if (!aIsPast && bIsPast) return -1;

    return new Date(a.Date).getTime() - new Date(b.Date).getTime();
  });

  const totalPages = Math.ceil(sortedAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = sortedAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>
        );
      case "no-show":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            No Show
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search appointments..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {(searchQuery || statusFilter !== "all") && (
          <div className="text-sm text-gray-500">
            Found {filteredAppointments.length} appointment
            {filteredAppointments.length !== 1 ? "s" : ""}
            {statusFilter !== "all" ? ` with status "${statusFilter}"` : ""}
            {searchQuery ? ` matching "${searchQuery}"` : ""}
          </div>
        )}
      </div>

      {sortedAppointments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3">
              <Calendar className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No appointments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You don't have any appointments scheduled. Book an appointment to get started."}
            </p>
            <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700">
              <Link to="/patient/doctors">Find a Doctor</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-6">
            {paginatedAppointments.map((appointment) => {
              const isPastAppointment = isPast(new Date(appointment.Date));
              const isCancelled = appointment.Status === "pending" && isPastAppointment;

              return (
                <Card
                  key={appointment.id}
                  className={`overflow-hidden hover:shadow-md transition-shadow ${
                    appointment.Status === "scheduled"
                      ? "border-l-4 border-l-blue-500"
                      : appointment.Status === "completed"
                      ? "border-l-4 border-l-green-500"
                      : isCancelled
                      ? "border-l-4 border-l-red-500"
                      : appointment.Status === "cancelled"
                      ? "border-l-4 border-l-amber-500"
                      : ""
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r bg-gray-50">
                        <div className="flex flex-col items-center md:items-start">
                          <div className="text-lg font-medium text-teal-700">
                            {format(appointment.Date, "MMMM d, yyyy")}
                          </div>
                          <div className="text-sm text-gray-500">
                            {format(appointment.Date, "h:mm a")}
                          </div>
                          <div className="mt-2">
                            {getStatusBadge(
                              isCancelled ? "cancelled" : appointment.Status
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 col-span-1 md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-teal-100">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40`}
                              alt={appointment.Doctor.name}
                            />
                            <AvatarFallback>
                              {getInitials(appointment.Doctor.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">Dr. {appointment.Doctor.name}</h3>
                            <p className="text-sm text-gray-500">
                              {appointment.Doctor.speciality}
                            </p>
                          </div>
                        </div>

                        {appointment?.notes && (
                          <div className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Reason:</span>{" "}
                            {appointment?.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

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
