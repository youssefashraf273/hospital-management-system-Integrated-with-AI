import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, Eye, FileText, MoreHorizontal, User } from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useSearchParams } from "react-router-dom";
import { Appointment } from "@/types";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";

type Props = {
  appointments: Appointment[];
};

export default function AppointmentsList({ appointments }: Props) {
  // const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const [searchParams] = useSearchParams();

  // Filter appointments based on URL params
  const statusFilter = searchParams.get("status");
  const dateFilter = searchParams.get("date");

  const filteredAppointments = appointments.filter((appointment) => {
    // Apply status filter

    // Apply date filter
    if (dateFilter) {
      const appointmentDate = format(appointment.Date, "yyyy-MM-dd");
      if (appointmentDate !== dateFilter) {
        return false;
      }
    }

    return true;
  });

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    setIsUpdating(appointmentId);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/manageAppointments/${appointmentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success("Status updated", {
          description: data?.message || `Appointment status changed to ${newStatus}`,
        });
        queryClient.invalidateQueries({ queryKey: ["todayAppointments"] });
      } else {
        toast.error("Error", {
          description:
            (data as { error: string })?.error ||
            (data as { message: string })?.message ||
            `Failed to update appointment status`,
        });
      }
    } catch (error: unknown) {
      toast.error("Error", {
        description: (error as Error)?.message || `Failed to update appointment status`,
      });
    } finally {
      setIsUpdating(null);
    }
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
              ? "Try changing your filters or create a new appointment."
              : "Get started by creating a new appointment."}
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/appointments/new">New Appointment</Link>
            </Button>
            {(statusFilter || dateFilter) && (
              <Button asChild variant="outline">
                <Link to="/appointments">Clear Filters</Link>
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
          {/* <Button asChild variant="outline" size="sm"> */}
          <Button className="btn-primary text-lg py-3">Add Appointment</Button>
          {/* </Button> */}
        </div>
      </div>

      {filteredAppointments.map((appointment) => (
        <Card
          key={appointment.id}
          className={`overflow-hidden hover:shadow-md max-h-[250px] transition-shadow ${
            appointment.Status === "scheduled"
              ? "border-l-4 border-l-blue-500"
              : appointment.Status === "completed"
              ? "border-l-4 border-l-green-500"
              : appointment.Status === "cancelled"
              ? "border-l-4 border-l-red-500"
              : appointment.Status === "no-show"
              ? "border-l-4 border-l-amber-500"
              : ""
          }`}
        >
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
              {/* Left section with patient info */}
              <div className="px-6 py-2 flex items-center gap-4 border-b md:border-b-0 md:border-r">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={"/placeholder.svg"}
                    alt={appointment.Patient.FullName}
                  />
                  <AvatarFallback>
                    {getInitials(appointment.Patient.FullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-md">{appointment.Patient.FullName}</h3>
                  <p className="text-xs text-gray-500">{appointment.Patient.phone}</p>
                </div>
              </div>

              <div className="px-6 py-1 col-span-1 md:col-span-2 lg:col-span-3 space-y-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium">
                      {format(appointment.Date, "MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-teal-600" />
                    <span className="text-sm">{format(appointment.Date, "h:mm a")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-teal-600" />
                    <span className="text-sm">{appointment.Doctor.name}</span>
                    <span className="text-xs text-gray-500">
                      ({appointment.Doctor.speciality})
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {getStatusBadge(appointment.Status)}
                  {appointment.notes && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{appointment.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between px-4 py-2 bg-gray-50">
            <Button asChild variant="outline" size="sm">
              <Link to={`/dashboard/doctors/appointments/${appointment.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isUpdating === appointment.id}
                >
                  {isUpdating === appointment.id ? (
                    <>
                      <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      Change Status
                      <MoreHorizontal className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleStatusChange(appointment.id, "scheduled")}
                  disabled={appointment.Status === "scheduled"}
                >
                  Mark as Scheduled
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(appointment.id, "completed")}
                  disabled={appointment.Status === "completed"}
                >
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(appointment.id, "cancelled")}
                  disabled={appointment.Status === "cancelled"}
                >
                  Mark as Cancelled
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(appointment.id, "no-show")}
                  disabled={appointment.Status === "no-show"}
                >
                  Mark as No Show
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
