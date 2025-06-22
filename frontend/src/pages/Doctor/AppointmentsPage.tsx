import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentsList from "@/components/Doctor/AppointmentsList";
import { useDoctorTodayAppointments } from "@/hooks/doctor/useDoctorAppointments";

export default function AppointmentsPage() {
  const { data: appointmentsData, isFetching, isError } = useDoctorTodayAppointments();

  console.log(appointmentsData);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to home page</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Today's Appointments</h1>
          </div>
          <p className="text-gray-500">Your Today’s Appointments with patients</p>
        </div>
        {/* <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link to="/dashboard/doctors/appointments/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Appointment
          </Link>
        </Button> */}
      </div>

      {isFetching ? (
        <AppointmentsListSkeleton />
      ) : (
        appointmentsData && <AppointmentsList appointments={appointmentsData} />
      )}
    </div>
  );
}

function AppointmentsListSkeleton() {
  return (
    <div className="rounded-lg border shadow animate-pulse">
      <div className="p-6">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row gap-4 py-4 border-b last:border-0"
            >
              <div className="flex items-center gap-4 w-full md:w-1/3">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-3">
                <div className="flex flex-wrap gap-4">
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
