"use server";

import { isToday } from "date-fns";

// Mock data - replace with actual database operations
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
      id: "p1",
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "123-456-7890",
      email: "john.smith@example.com",
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
      id: "p1",
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "123-456-7890",
      email: "john.smith@example.com",
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
    notes: "Patient requested cancellation",
  },
  {
    id: "5",
    date: new Date("2025-05-09T16:30:00"),
    status: "no-show",
    patient: {
      id: "p2",
      name: "Emily Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "234-567-8901",
      email: "emily.johnson@example.com",
    },
    doctor: {
      id: "d4",
      name: "Dr. Robert Brown",
      speciality: "Orthopedics",
    },
    notes: "Patient did not show up",
  },
];

// For demo purposes, set some appointments to today
const today = new Date();
appointments[0].date = new Date(today.setHours(9, 30, 0, 0));
appointments[2].date = new Date(today.setHours(11, 15, 0, 0));

// Update the getPatientAppointments function to ensure it always returns an array
export function getPatientAppointments(patientId: string) {
  // In a real application, you would fetch from your database
  // Make sure we always return an array, even if no appointments are found
  return appointments.filter((appointment) => appointment.patient.id === patientId) || [];
}

export function getPatientTodayAppointments(patientId: string) {
  // Get all appointments for this patient
  const patientAppointments = getPatientAppointments(patientId);

  // Filter for today's appointments
  return patientAppointments.filter((appointment) => isToday(new Date(appointment.date)));
}

export async function requestCancelAppointment(appointmentId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would update the appointment in your database
  // Example with a database client:
  // await db.appointment.update({
  //   where: { id: appointmentId },
  //   data: { cancellationRequested: true }
  // })

  console.log(`Cancellation requested for appointment with ID ${appointmentId}`);

  //   // Revalidate the appointments pages to reflect the changes
  //   revalidatePath("/patient/appointments")
  //   revalidatePath("/patient/appointments/today")
  //   revalidatePath(`/patient/appointments/${appointmentId}`)

  return { success: true };
}
