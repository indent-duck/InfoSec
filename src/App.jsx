import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/user/Home";
import Submission from "./pages/user/Submission";
import SignupRoutes from "./pages/sign_up/SignupRoutes";
import DataAdminSub from "./admin/DataAdminSub";

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
        
         <Route
          path="/submissions"
          element={
         
              <DataAdminSub />
        
          }
        />


        <Route path="/signup/*" element={<SignupRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
