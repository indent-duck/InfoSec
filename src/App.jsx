import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/user/Home";
import HomeAdmin from "./pages/admin/Home";
import Submission from "./pages/user/Submission";
import SignupRoutes from "./pages/sign_up/SignupRoutes";
import DataAdminSub from "./pages/admin/DataAdminSub";
import DataAdminRev from "./pages/admin/DataAdminRev";
function App() {
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
          path="/submit"
          element={
            <ProtectedRoute>
              <Submission />
            </ProtectedRoute>
          }
        />
        {/* protected route for admin to be added later */}
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/submission" element={<DataAdminSub />} />
        <Route path="admin/review" element={<DataAdminRev />} />

        <Route path="/signup/*" element={<SignupRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;