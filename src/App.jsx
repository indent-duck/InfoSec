import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/user/Home";
import HomeAdmin from "./pages/admin/Home";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import Submission from "./pages/user/Submission";
import SignupRoutes from "./pages/sign_up/SignupRoutes";
import CreateForm from "./pages/admin/Form.jsx";

import Test from "./pages/test/test.jsx";

function App() {
  console.log("App component loaded");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit/:formId"
          element={
            <ProtectedRoute>
              <Submission />
            </ProtectedRoute>
          }
        />
        {/* protected route for admin to be added later */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/home" element={<HomeAdmin />} />
        <Route path="/admin/forms/create" element={<CreateForm />} />
        <Route path="/signup/*" element={<SignupRoutes />} />
        {/* test route */}
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
