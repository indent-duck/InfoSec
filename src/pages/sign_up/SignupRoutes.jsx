import React from "react";
import { Routes, Route } from "react-router-dom";
import EmailStep from "./EmailStep";
import VerifyStep from "./VerifyStep";
import PasswordStep from "./PasswordStep";
import DoneStep from "./DoneStep";

export default function SignupRoutes() {
  return (
    <Routes>
      <Route path="email" element={<EmailStep />} />
      <Route path="verify" element={<VerifyStep />} />
      <Route path="password" element={<PasswordStep />} />
      <Route path="done" element={<DoneStep />} />
    </Routes>
  );
}
