import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProtectedSignupStep({ children, requiredStep, currentStep }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user tries to access a step beyond what they've completed
    if (currentStep > requiredStep) {
      navigate("/signup/email");
      return;
    }

    // Check if user has required data from previous steps
    if (requiredStep > 1 && !location.state?.email) {
      navigate("/signup/email");
      return;
    }
  }, [currentStep, requiredStep, navigate, location.state]);

  return children;
}