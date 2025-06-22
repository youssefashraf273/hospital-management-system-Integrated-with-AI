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
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, XCircle } from "lucide-react";
import { format, isPast } from "date-fns";
import { Link } from "react-router-dom";

interface PatientAppointmentDetailsProps {
  appointment: any; // Replace with proper type
}

export default function PatientAppointmentDetails({
  appointment,
}: PatientAppointmentDetailsProps) {
  const [isCancelling, setIsCancelling] = useState(false);

  const isPastAppointment = isPast(new Date(appointment.date));
  const canCancel = appointment.status === "scheduled" && !isPastAppointment;

  const handleCancelRequest = async () => {
    // setIsCancelling(true)
    // try {
    //   await requestCancelAppointment(appointment.id)
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
    //   setIsCancelling(false)
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

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" asChild className="gap-1">
          <Link to="/patient/appointments">
            <ArrowLeft className="h-4 w-4" />
            Back to My Appointments
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Details Card */}
        <Card className="lg:col-span-2 border-t-4 border-t-teal-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-teal-600" />
              Appointment Details
            </CardTitle>
            {getStatusBadge(appointment.status)}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-teal-600">Date & Time</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">
                    {format(appointment.date, "MMMM d, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{format(appointment.date, "h:mm a")}</span>
                </div>
              </div>

              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-teal-600">Location</div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Main Hospital</span>
                </div>
                <div className="text-sm text-gray-500 pl-6">
                  123 Medical Center Dr, Suite 200
                </div>
              </div>
            </div>

            {appointment.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-teal-600 mb-2">
                  Appointment Notes
                </div>
                <p className="text-gray-700">{appointment.notes}</p>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-blue-700 mb-2">
                Preparation Instructions
              </div>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Please arrive 15 minutes before your scheduled appointment time</li>
                <li>Bring your insurance card and photo ID</li>
                <li>Bring a list of current medications</li>
                <li>Wear comfortable clothing</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
            {canCancel ? (
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleCancelRequest}
                disabled={isCancelling}
              >
                {isCancelling ? (
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
            ) : (
              <div className="text-sm text-gray-500">
                {isPastAppointment
                  ? "This appointment has already passed"
                  : "This appointment cannot be cancelled"}
              </div>
            )}

            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to={`tel:${appointment.doctor.phone || "5551234567"}`}>
                <Phone className="mr-2 h-4 w-4" />
                Contact Clinic
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Doctor Information Card */}
        <Card className="border-t-4 border-t-teal-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600" />
              Your Doctor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-teal-100">
                <AvatarImage
                  src={`/placeholder.svg?height=64&width=64`}
                  alt={appointment.doctor.name}
                />
                <AvatarFallback className="bg-teal-50 text-teal-700">
                  {getInitials(appointment.doctor.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg">{appointment.doctor.name}</h3>
                <p className="text-sm text-gray-500">{appointment.doctor.speciality}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-teal-600 mb-2">About</div>
              <p className="text-sm text-gray-700">
                {appointment.doctor.name} is a board-certified{" "}
                {appointment.doctor.speciality.toLowerCase()} specialist with over 10
                years of experience in treating patients with various conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
