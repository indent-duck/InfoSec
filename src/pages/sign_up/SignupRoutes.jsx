import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedSignupStep from "./ProtectedSignupStep";
import EmailStep from "./EmailStep";
import VerifyStep from "./VerifyStep";
import PasswordStep from "./PasswordStep";
import DoneStep from "./DoneStep";

export default function SignupRoutes() {
  return (
    <Routes>
      <Route path="email" element={<EmailStep />} />
      <Route path="verify" element={
        <ProtectedSignupStep requiredStep={2} currentStep={2}>
          <VerifyStep />
        </ProtectedSignupStep>
      } />
      <Route path="password" element={
        <ProtectedSignupStep requiredStep={3} currentStep={3}>
          <PasswordStep />
        </ProtectedSignupStep>
      } />
      <Route path="done" element={
        <ProtectedSignupStep requiredStep={4} currentStep={4}>
          <DoneStep />
        </ProtectedSignupStep>
      } />
    </Routes>
  );
}
