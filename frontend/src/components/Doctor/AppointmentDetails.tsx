import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  MoreHorizontal,
  Phone,
  User,
} from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Appointment } from "@/types";

interface AppointmentDetailsProps {
  appointment: Appointment;
}

export default function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {};

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
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link to="/appointments">
            <ArrowLeft className="h-4 w-4" />
            Back to Appointments
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Information Card */}
        <Card className="border-t-4 border-t-teal-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-teal-100">
                <AvatarImage
                  src={"/placeholder.svg"}
                  alt={appointment.Patient.FullName}
                />
                <AvatarFallback className="bg-teal-50 text-teal-700">
                  {getInitials(appointment.Patient.FullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{appointment.Patient.FullName}</h3>
                <Link
                  to={`/patients/${appointment.Patient.id}`}
                  className="text-sm text-teal-600 hover:text-teal-700"
                >
                  View Patient Profile
                </Link>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-600" />
                <span>{appointment.Patient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-600" />
                <span>{appointment.Patient.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Details Card */}
        <Card
          className={`lg:col-span-2 border-t-4 ${
            appointment.Status === "scheduled"
              ? "border-t-blue-500"
              : appointment.Status === "completed"
              ? "border-t-green-500"
              : appointment.Status === "cancelled"
              ? "border-t-red-500"
              : appointment.Status === "no-show"
              ? "border-t-amber-500"
              : "border-t-gray-500"
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              Appointment Details
            </CardTitle>
            {getStatusBadge(appointment.Status)}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-teal-600">Date & Time</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">
                    {format(appointment.Date, "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{format(appointment.Date, "h:mm a")}</span>
                </div>
              </div>

              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-teal-600">Doctor</div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{appointment.Doctor.name}</span>
                </div>
                <div className="text-sm text-gray-500 pl-6">
                  {appointment.Doctor.speciality}
                </div>
              </div>
            </div>

            {appointment.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-teal-600 mb-2">Notes</div>
                <p className="text-gray-700">{appointment.notes}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
            {/* <Button
              variant="outline"
              onClick={() => router.push(`/appointments/edit/${appointment.id}`)}
            >
              Edit Appointment
            </Button> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isUpdating}>
                  {isUpdating ? (
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
                  onClick={() => handleStatusChange("scheduled")}
                  disabled={appointment.Status === "scheduled"}
                >
                  Mark as Scheduled
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange("completed")}
                  disabled={appointment.Status === "completed"}
                >
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange("cancelled")}
                  disabled={appointment.Status === "cancelled"}
                >
                  Mark as Cancelled
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange("no-show")}
                  disabled={appointment.Status === "no-show"}
                >
                  Mark as No Show
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
