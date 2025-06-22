import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import AddDoctor from "./pages/Admin/AddDoctorPage";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/protectedRoute";
import DoctorsList from "./pages/Admin/DoctorsPage";
import MedicinesPage from "./pages/Admin/medicines/MedicinesPage";
import AppointmentsPage from "./pages/Doctor/AppointmentsPage";
import DoctorsPage from "./pages/Patient/DoctorsSearchPage";
import MyMedicalRecordsPage from "./pages/Patient/MyMedicalRecordsPage";
import MedicalRecordDetailsPage from "./pages/Patient/MedicalRecordDetails";
import MyLabTestDetailsPage from "./pages/Patient/MyLabTestDetailsPage";
import EditMedicinePage from "./pages/Admin/medicines/EditMedicinePage";
import AddMedicinePage from "./pages/Admin/medicines/AddMedicinePage";
import PatientMedicalRecordsPage from "./pages/Doctor/MedicalRecordsPage";
import PatientsPage from "./pages/Doctor/PatientsPage";
import AddMedicalRecordPage from "./pages/Doctor/AddMedicalRecordPage";
import UpdateMedicalRecordPage from "./pages/Doctor/UpdateMedicalRecordPage";
import DoctorLabTestsPage from "./pages/Doctor/LabTestsPage";
import PatientAppointmentsPage from "./pages/Patient/MyAppointmentsPage";
import MyLabTestsPage from "./pages/Patient/MyLabTestsPage";
import LandingPage from "./pages/LandingPage";
import AppointmentDetailsPage from "./pages/Doctor/AppointmentDetailsPage";
import ChatbotPage from "./pages/Patient/ChatbotPage";
import AddLabTestPage from "./pages/Doctor/AddLabTestsPage";
import AllLabTests from "./pages/Doctor/AllLabTestsPage";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import AdminPaymentsPage from "./pages/Admin/PaymentsPage";
import AddAdminPage from "./pages/Admin/AddAdminPage";
import AdminPatientsPage from "./pages/Admin/AdminPatientsPage";
import AllAppointmentsPage from "./pages/Admin/AllAppointmentsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route path="doctors">
              <Route path="my-appointments" element={<AppointmentsPage />} />
              <Route path="appointments/:id" element={<AppointmentDetailsPage />} />
              <Route path="lab-tests" element={<AllLabTests />} />
              <Route
                path="patients/:patientId/lab-tests"
                element={<DoctorLabTestsPage />}
              />
              <Route
                path="patients/:patientId/lab-tests/add"
                element={<AddLabTestPage />}
              />
              {/* <Route path="lab-tests" element={<AddL />} /> */}
              <Route path="patients" element={<PatientsPage />} />
              <Route
                path="patients/:patientId/medical-records"
                element={<PatientMedicalRecordsPage />}
              />{" "}
              {/* <Route
                path="patients/:patientId/medical-records/:id"
                element={<MedicalRecordDetailsPage />}
              /> */}
              <Route
                path="patients/:patientId/medical-records/new"
                element={<AddMedicalRecordPage />}
              />{" "}
              <Route
                path="patients/:patientId/medical-records/:recordId/edit"
                element={<UpdateMedicalRecordPage />}
              />
              <Route path="create" element={<AddDoctor />} />
            </Route>{" "}
            <Route path="patient">
              {/* <Route path="my-appointments" element={<PatientAppointmentsList />} /> */}
              <Route path="chatbot" element={<ChatbotPage />} />
              <Route path="doctors" element={<DoctorsPage />} />
              <Route path="appointments" element={<PatientAppointmentsPage />} />
              <Route path="medical-records" element={<MyMedicalRecordsPage />} />
              <Route path="medical-records/:id" element={<MedicalRecordDetailsPage />} />
              <Route path="lab-tests" element={<MyLabTestsPage />} />
              <Route path="lab-tests/:id" element={<MyLabTestDetailsPage />} />
            </Route>
            {/* MEDICINCES */}
            <Route path="medicines">
              <Route index element={<MedicinesPage />} />
              <Route path="add" element={<AddMedicinePage />} />
              <Route path=":id/edit" element={<EditMedicinePage />} />
            </Route>
            {/* ADMIN Routes */}
            <Route path="admin">
              <Route index element={<AdminDashboardPage />} />
              <Route path="doctors" element={<DoctorsList />} />
              <Route path="patients" element={<AdminPatientsPage />} />
              <Route path="appointments" element={<AllAppointmentsPage />} />
              <Route path="payments" element={<AdminPaymentsPage />} />
              <Route path="doctors/add" element={<AddDoctor />} />
              <Route path="admins/add" element={<AddAdminPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
