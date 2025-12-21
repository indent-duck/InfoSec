import React from "react";
import { useNavigate } from "react-router-dom";
import SignupCounter from "../../components/SignupCounter";
import styles from "./signupSteps.module.css";

export default function VerifyStep({ EmailAddress }) {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // verification process

    navigate("/signup/password");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.FormContainer}>
        <h1>Sign up</h1>
        <SignupCounter stepNo={1} />
        <form className={styles.Form} onSubmit={handleSubmit}>
          <h2 className={styles.FormTitle}>Enter Verification Code</h2>
          <div className={styles.FormBody}>
            <label>Email address: {EmailAddress}</label>
            <p className={styles.p_Verify}>
              check your inbox for verification code
            </p>
            <div className={styles.inputField_verify}>
              <label>Verification Code:</label>
              <input
                className={styles.textField_verify}
                type="text"
                placeholder="XXXXXX"
              />
            </div>
            <div className={styles.verifyButtons}>
              <button
                className={styles.backButton}
                id="backButton"
                type="button"
                onClick={() => navigate("/signup/email")}
              >
                Back
              </button>
              <button className={styles.button} type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
