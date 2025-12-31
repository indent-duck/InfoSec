import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import AdminDashboard from "./Dashboard.jsx";
import ManageForms from "./ManageForms.jsx";
import ViewSubmissions from "./ViewSubmissions.jsx";
import FormSubmissions from "./FormSubmissions.jsx";
import ReviewQueue from "./ReviewQueue.jsx";
import UserManagement from "./UserManagement.jsx";
import CreateForm from "./CreateForm.jsx";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/forms" element={<ProtectedRoute><ManageForms /></ProtectedRoute>} />
      <Route path="/forms/create" element={<ProtectedRoute><CreateForm /></ProtectedRoute>} />
      <Route path="/submissions" element={<ProtectedRoute><ViewSubmissions /></ProtectedRoute>} />
      <Route path="/submissions/:formId" element={<ProtectedRoute><FormSubmissions /></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><ReviewQueue /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
    </Routes>
  );
}