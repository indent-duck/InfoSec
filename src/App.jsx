import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/user/Home";
import AdminRoutes from "./pages/admin/AdminRoutes.jsx";
import Submission from "./pages/user/Submission";
import SignupRoutes from "./pages/sign_up/SignupRoutes";
<<<<<<< HEAD
import CreateForm from "./pages/admin/Form.jsx"
=======
import Test from "./pages/test/test.jsx";
>>>>>>> 230d2fddfca36d7f7f06aa0552580d5647c0a7de

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
          path="/submit/:formId"
          element={
            <ProtectedRoute>
              <Submission />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/signup/*" element={<SignupRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;