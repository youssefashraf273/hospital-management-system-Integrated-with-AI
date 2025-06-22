"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Eye, FileText, XCircle } from "lucide-react";
import { format, isPast } from "date-fns";
import { Link, useSearchParams } from "react-router-dom";

const appointments = [
  {
    id: "1",
    date: new Date("2025-05-10T09:30:00"),
    status: "scheduled",
    patient: {
      id: "p1",
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "123-456-7890",
      email: "john.smith@example.com",
    },
    doctor: {
      id: "d1",
      name: "Dr. Jane Wilson",
      speciality: "Cardiology",
    },
    notes: "Regular checkup",
  },
  {
    id: "2",
    date: new Date("2025-05-09T14:00:00"),
    status: "completed",
    patient: {
      id: "p2",
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "234-567-8901",
      email: "emily.johnson@example.com",
    },
    doctor: {
      id: "d2",
      name: "Dr. Michael Brown",
      speciality: "Neurology",
    },
    notes: "Follow-up appointment",
  },
  {
    id: "3",
    date: new Date("2025-05-11T11:15:00"),
    status: "scheduled",
    patient: {
      id: "p3",
      name: "Robert Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "345-678-9012",
      email: "robert.davis@example.com",
    },
    doctor: {
      id: "d3",
      name: "Dr. Sarah Williams",
      speciality: "Pediatrics",
    },
    notes: "Annual physical",
  },
  {
    id: "4",
    date: new Date("2025-05-08T10:00:00"),
    status: "cancelled",
    patient: {
      id: "p4",
      name: "Lisa Miller",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "456-789-0123",
      email: "lisa.miller@example.com",
    },
    doctor: {
      id: "d1",
      name: "Dr. Jane Wilson",
      speciality: "Cardiology",
    },
    notes: "Patient requested cancellation",
  },
  {
    id: "5",
    date: new Date("2025-05-09T16:30:00"),
    status: "no-show",
    patient: {
      id: "p5",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "567-890-1234",
      email: "david.wilson@example.com",
    },
    doctor: {
      id: "d4",
      name: "Dr. Robert Brown",
      speciality: "Orthopedics",
    },
    notes: "Patient did not show up",
  },
];
export default function PatientAppointmentsList() {
  //   const router = useRouter()
  const [searchParams] = useSearchParams();
  const [cancelling, setCancelling] = useState<string | null>(null);

  // Get appointments for this patient
  // Ensure we're working with an array
  //   const appointments = getPatientAppointments(patientId) || []

  // Filter appointments based on URL params
  const statusFilter = searchParams.get("status");
  const dateFilter = searchParams.get("date");

  const filteredAppointments = appointments.filter((appointment) => {
    // Apply status filter
    if (statusFilter && appointment.status !== statusFilter) {
      return false;
    }

    // Apply date filter
    if (dateFilter) {
      const appointmentDate = format(appointment.date, "yyyy-MM-dd");
      if (appointmentDate !== dateFilter) {
        return false;
      }
    }

    return true;
  });

  // Sort appointments: upcoming first, then by date
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    // First sort by past/upcoming
    const aIsPast = isPast(new Date(a.date));
    const bIsPast = isPast(new Date(b.date));

    if (aIsPast && !bIsPast) return 1;
    if (!aIsPast && bIsPast) return -1;

    // Then sort by date
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const handleCancelRequest = async (appointmentId: string) => {
    // setCancelling(appointmentId)
    // try {
    //   await requestCancelAppointment(appointmentId)
    //   toast({
    //     title: "Cancellation requested",
    //     description: "Your cancellation request has been submitted and is pending approval.",
    //   })
    //   router.refresh()
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to request cancellation. Please try again or contact support.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setCancelling(null)
    // }
  };

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

  if (filteredAppointments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-gray-100 p-3">
            <Calendar className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No appointments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter || dateFilter
              ? "Try changing your filters or request a new appointment."
              : "You don't have any appointments scheduled. Request a new appointment to get started."}
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard/doctors/appointments/request">
                Request Appointment
              </Link>
            </Button>
            {(statusFilter || dateFilter) && (
              <Button asChild variant="outline">
                <Link to="/dashboard/doctors/appointments">Clear Filters</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-500">
          Showing {filteredAppointments.length} appointment
          {filteredAppointments.length !== 1 ? "s" : ""}
          {statusFilter && ` with status "${statusFilter}"`}
          {dateFilter && ` on ${format(new Date(dateFilter), "MMMM d, yyyy")}`}
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/dashboard/doctors/appointments/today">Today's Appointments</Link>
          </Button>
        </div>
      </div>

      {sortedAppointments.map((appointment) => {
        const isPastAppointment = isPast(new Date(appointment.date));
        const canCancel = appointment.status === "scheduled" && !isPastAppointment;

        return (
          <Card
            key={appointment.id}
            className={`overflow-hidden hover:shadow-md transition-shadow ${
              appointment.status === "scheduled"
                ? "border-l-4 border-l-blue-500"
                : appointment.status === "completed"
                ? "border-l-4 border-l-green-500"
                : appointment.status === "cancelled"
                ? "border-l-4 border-l-red-500"
                : appointment.status === "no-show"
                ? "border-l-4 border-l-amber-500"
                : ""
            }`}
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Left section with date and time */}
                <div className="p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r bg-gray-50">
                  <div className="flex flex-col items-center md:items-start">
                    <div className="text-lg font-medium text-teal-700">
                      {format(appointment.date, "MMMM d, yyyy")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(appointment.date, "h:mm a")}
                    </div>
                    <div className="mt-2">{getStatusBadge(appointment.status)}</div>
                  </div>
                </div>

                {/* Middle section with doctor details */}
                <div className="p-6 col-span-1 md:col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-teal-100">
                      <AvatarImage
                        src={`/placeholder.svg?height=40&width=40`}
                        alt={appointment.doctor.name}
                      />
                      <AvatarFallback>
                        {getInitials(appointment.doctor.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{appointment.doctor.name}</h3>
                      <p className="text-sm text-gray-500">
                        {appointment.doctor.speciality}
                      </p>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{appointment.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between p-4 bg-gray-50">
              <Button asChild variant="outline" size="sm">
                <Link to={`/dashboard/doctors/appointments/${appointment.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>

              {canCancel && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleCancelRequest(appointment.id)}
                  disabled={cancelling === appointment.id}
                >
                  {cancelling === appointment.id ? (
                    <>
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Request Cancellation
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
