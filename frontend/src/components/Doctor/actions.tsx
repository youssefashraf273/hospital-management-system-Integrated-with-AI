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

// Mock medical records data
const medicalRecords = [
  {
    id: "mr1",
    patientId: "p1",
    appointmentId: "1",
    date: new Date("2025-05-10T09:30:00"),
    diagnosis: "Hypertension",
    prescription: "Lisinopril 10mg, once daily",
    notes: "Blood pressure: 140/90. Follow up in 3 months.",
    doctorName: "Dr. Jane Wilson",
  },
  {
    id: "mr2",
    patientId: "p1",
    appointmentId: "prev1",
    date: new Date("2025-04-10T10:00:00"),
    diagnosis: "Common cold",
    prescription: "Acetaminophen 500mg as needed for fever",
    notes: "Rest and hydration recommended. Symptoms should resolve within a week.",
    doctorName: "Dr. Jane Wilson",
  },
  {
    id: "mr3",
    patientId: "p2",
    appointmentId: "2",
    date: new Date("2025-05-09T14:00:00"),
    diagnosis: "Migraine",
    prescription: "Sumatriptan 50mg as needed for migraine attacks",
    notes:
      "Patient reports increased frequency of migraines. Recommended stress management techniques.",
    doctorName: "Dr. Michael Brown",
  },
];

export async function getAppointment(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return appointment;
}

export async function updateAppointmentStatus(id: string, status: string) {
  // Validate status
  if (!["scheduled", "completed", "cancelled", "no-show"].includes(status)) {
    throw new Error("Invalid status");
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would update the appointment in your database
  // Example with a database client:
  // await db.appointment.update({ where: { id }, data: { status } })

  console.log(`Appointment with ID ${id} status updated to ${status}`);

  // Revalidate the appointments pages to reflect the changes

  return { success: true };
}

export function getMedicalRecords(patientId: string) {
  // In a real application, you would fetch from your database
  // Make sure we always return an array, even if no records are found
  return medicalRecords.filter((record) => record.patientId === patientId) || [];
}

export async function addMedicalRecord(data: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would add the record to your database
  // Example with a database client:
  // await db.medicalRecord.create({ data })

  console.log("Medical record added:", data);

  // Revalidate the appointments page to reflect the changes

  return { success: true };
}

export async function updateMedicalRecord(id: string, data: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would update the record in your database
  // Example with a database client:
  // await db.medicalRecord.update({ where: { id }, data })

  console.log(`Medical record with ID ${id} updated:`, data);

  // Revalidate the appointments page to reflect the changes

  return { success: true };
}

export async function deleteMedicalRecord(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would delete the record from your database
  // Example with a database client:
  // await db.medicalRecord.delete({ where: { id } })

  console.log(`Medical record with ID ${id} deleted`);

  // Find the record to get the appointment ID
  const record = medicalRecords.find((r) => r.id === id);

  return { success: true };
}
