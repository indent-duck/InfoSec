import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupCounter from "../../components/SignupCounter";
import styles from "./signupSteps.module.css";

export default function PasswordStep() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    } else {
      navigate("/signup/done");
    }
    // password matching
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.FormContainer}>
        <h1>Sign up</h1>
        <SignupCounter stepNo={2} />
        <form className={styles.Form} onSubmit={handleSubmit}>
          <h2 className={styles.FormTitle}>Enter Verification Code</h2>
          <div className={styles.FormBody}>
            <div className={styles.inputField_password}>
              <label>Password:</label>
              <input
                className={styles.textField_password}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputField_password}>
              <label>Confirm Password:</label>
              <input
                className={styles.textField_password}
                type="password"
                placeholder="Re-enter your password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <p className={styles.errorMessage}>{error}</p>
            <button className={styles.button} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
