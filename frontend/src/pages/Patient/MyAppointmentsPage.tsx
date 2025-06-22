import PatientAppointmentsList from "@/components/Patient/PatientAppointmentsList";
import PatientAppointmentsListSkeleton from "@/components/Patient/AppointmentsListSkeleton";
import { useTodayAppointments } from "@/hooks/patient/useAppointments";
import AppointmentsList from "@/components/Doctor/AppointmentsList";

export default function PatientAppointmentsPage() {
  const { data, isFetching } = useTodayAppointments();

  const patientAppointments = data?.appointments;
  console.log("test", data, patientAppointments);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Today Appointments</h1>
        <p className="text-gray-500 mt-1">View and manage your scheduled appointments</p>
      </div>

      {isFetching ? (
        <PatientAppointmentsListSkeleton />
      ) : !isFetching && data ? (
        <AppointmentsList appointments={patientAppointments} />
      ) : (
        <div>Not found </div>
      )}
    </div>
  );
}
