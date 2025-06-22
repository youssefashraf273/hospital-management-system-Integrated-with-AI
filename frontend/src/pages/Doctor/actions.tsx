"use server";

// Mock data - replace with actual database operations
const patients = [
  {
    id: "p1",
    name: "John Smith",
    gender: "Male",
    age: 45,
    dateOfBirth: new Date("1980-05-15"),
    phone: "123-456-7890",
    email: "john.smith@example.com",
    address: "123 Main St, Anytown, USA",
    medicalHistory: "Hypertension, Type 2 Diabetes",
    insuranceProvider: "Blue Cross Blue Shield",
    insuranceNumber: "BCBS12345678",
  },
  {
    id: "p2",
    name: "Emily Johnson",
    gender: "Female",
    age: 32,
    dateOfBirth: new Date("1993-09-22"),
    phone: "234-567-8901",
    email: "emily.johnson@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    medicalHistory: "Asthma, Allergies (peanuts)",
    insuranceProvider: "Aetna",
    insuranceNumber: "AET87654321",
  },
  {
    id: "p3",
    name: "Robert Davis",
    gender: "Male",
    age: 58,
    dateOfBirth: new Date("1967-03-10"),
    phone: "345-678-9012",
    email: "robert.davis@example.com",
    address: "789 Pine St, Elsewhere, USA",
    medicalHistory: "Coronary Artery Disease, Hyperlipidemia",
    insuranceProvider: "Medicare",
    insuranceNumber: "MED98765432",
  },
];

export function getPatient(patientId: string) {
  // Simulate API delay

  // In a real application, you would fetch from your database
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return null;
  }
  return patient;
}

const medicalRecords = [
  {
    id: "1",
    patientId: "p1",
    date: new Date("2025-05-10T09:30:00"),
    diagnosis: "Hypertension",
    symptoms: "Headache, dizziness, shortness of breath",
    prescribed_medication: "Lisinopril 10mg, once daily",
    notes: "Blood pressure: 140/90. Follow up in 3 months.",
    is_critical: false,
    doctor: {
      id: "d1",
      name: "Dr. Jane Wilson",
      speciality: "Cardiology",
    },
  },
  {
    id: "2",
    patientId: "p1",
    date: new Date("2025-04-15T10:00:00"),
    diagnosis: "Upper Respiratory Infection",
    symptoms: "Cough, sore throat, nasal congestion, mild fever",
    prescribed_medication:
      "Acetaminophen 500mg as needed for fever, Dextromethorphan for cough",
    notes: "Rest and hydration recommended. Symptoms should resolve within a week.",
    is_critical: false,
    doctor: {
      id: "d2",
      name: "Dr. Michael Brown",
      speciality: "Internal Medicine",
    },
  },
  {
    id: "3",
    patientId: "p1",
    date: new Date("2025-03-22T14:00:00"),
    diagnosis: "Migraine",
    symptoms: "Severe headache, sensitivity to light and sound, nausea",
    prescribed_medication: "Sumatriptan 50mg as needed for migraine attacks",
    notes:
      "Patient reports increased frequency of migraines. Recommended stress management techniques.",
    is_critical: false,
    doctor: {
      id: "d3",
      name: "Dr. Sarah Williams",
      speciality: "Neurology",
    },
  },
  {
    id: "4",
    patientId: "p1",
    date: new Date("2024-11-05T11:15:00"),
    diagnosis: "Acute Appendicitis",
    symptoms: "Severe abdominal pain in lower right quadrant, fever, nausea, vomiting",
    prescribed_medication: "Referred for emergency surgery",
    notes:
      "Appendectomy performed on 11/05/2024. Post-operative recovery was uneventful.",
    is_critical: true,
    doctor: {
      id: "d4",
      name: "Dr. Robert Johnson",
      speciality: "General Surgery",
    },
  },
  {
    id: "5",
    patientId: "p2",
    date: new Date("2025-05-08T15:30:00"),
    diagnosis: "Type 2 Diabetes",
    symptoms: "Increased thirst, frequent urination, fatigue, blurred vision",
    prescribed_medication: "Metformin 500mg twice daily",
    notes: "HbA1c: 7.8%. Recommended dietary changes and regular exercise.",
    is_critical: false,
    doctor: {
      id: "d1",
      name: "Dr. Jane Wilson",
      speciality: "Cardiology",
    },
  },
];

export function getMedicalRecord(recordId: string) {
  // In a real application, you would fetch from your database
  const record = medicalRecords.find((r) => r.id === recordId);

  if (!record) {
    throw new Error("Medical record not found");
  }

  return record;
}
