import AppointmentDetails from "@/components/Doctor/AppointmentDetails";
import MedicalRecordsSkeleton from "@/components/Doctor/Appointments/ApointmentsSkeleton";
import MedicalRecordsList from "@/components/Doctor/Appointments/MedicalRecordList";
import { useDoctorAllAppointments } from "@/hooks/doctor/useDoctorAppointments";
import { useParams } from "react-router-dom";
import { Appointment } from "@/types";
import LoadingDiv from "@/components/LoadingDiv";
import { useGetPatientMedicalRecords } from "@/hooks/doctor/usePatientMedicalRecords";

export default function AppointmentDetailsPage() {
  const { id } = useParams();

  const { data: appointmentsData, isFetching } = useDoctorAllAppointments();

  const selectedAppointment = appointmentsData?.find(
    (appointment: Appointment) => String(appointment.id) === id
  );

  const { data: medicalRecords, isFetching: isFetchingMedicalRecords } =
    useGetPatientMedicalRecords(selectedAppointment?.Patient?.id);

  if (!id) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Appointment Details</h1>
          <p className="text-gray-500 mt-1">Appointment not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isFetching ? (
        <LoadingDiv />
      ) : (
        <AppointmentDetails appointment={selectedAppointment} />
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
        {isFetchingMedicalRecords || isFetching ? (
          <MedicalRecordsSkeleton />
        ) : (
          <MedicalRecordsList
            medicalRecords={medicalRecords?.medicalRecords || []}
            patientId={selectedAppointment?.Patient?.id}
            doctorName={selectedAppointment?.Doctor?.FullName}
            appointmentId={id || ""}
          />
        )}
      </div>
    </div>
  );
}
