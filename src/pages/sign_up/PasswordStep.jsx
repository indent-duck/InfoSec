import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupCounter from "../../components/SignupCounter";
import styles from "./modules/wrapper.module.css";
import passwordstyle from "./modules/passwordstep.module.css";

export default function PasswordStep() {
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const navigate = useNavigate();
  const { email } = location.state || {};

  // Debug logging
  console.log("PasswordStep - location.state:", location.state);
  console.log("PasswordStep - email:", email);

  // If no email, redirect back
  if (!email) {
    console.log("No email found, redirecting to email step");
    navigate("/signup/email");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/accounts/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          studentNumber,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Registration Failed");
        return;
      }

      navigate("/signup/done");
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.FormContainer}>
        <h1>Sign up</h1>
        <SignupCounter stepNo={2} />
        <form className={styles.Form} onSubmit={handleSubmit}>
          <h2 className={styles.FormTitle}>Create Account</h2>
          <div className={styles.FormBody}>
            <div className={passwordstyle.inputField_password}>
              <div className={passwordstyle.label}>
                <label>Email Address:</label>
                <label className={passwordstyle.verified}>verified</label>
              </div>
              <input
                className={passwordstyle.textField_password}
                type="text"
                placeholder="Enter your student number"
                value={email}
                readOnly
              />
            </div>
            <div className={passwordstyle.inputField_password}>
              <label>Student Number:</label>
              <input
                className={passwordstyle.textField_password}
                type="text"
                placeholder="Enter your student number"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                required
              />
            </div>
            <div className={passwordstyle.inputField_password}>
              <label>Password:</label>
              <input
                className={passwordstyle.textField_password}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={passwordstyle.inputField_password}>
              <label>Confirm Password:</label>
              <input
                className={passwordstyle.textField_password}
                type="password"
                placeholder="Re-enter your password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <p className={passwordstyle.errorMessage}>{error}</p>
            <button className={styles.button} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
