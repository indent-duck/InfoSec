import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupCounter from "../../components/SignupCounter";
import styles from "./modules/wrapper.module.css";
import verify from "./modules/verifystep.module.css";

export default function VerifyStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const handleSubmit = (e) => {
    e.preventDefault();

    // verification process

    navigate("/signup/password", { state: { email } });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.FormContainer}>
        <h1>Sign up</h1>
        <SignupCounter stepNo={1} />
        <form className={styles.Form} onSubmit={handleSubmit}>
          <h2 className={styles.FormTitle}>Enter Verification Code</h2>
          <div className={styles.FormBody}>
            <label>
              Email address: <strong>{email}</strong>
            </label>
            <p className={verify.p_Verify}>
              check your inbox for verification code
            </p>
            <div className={verify.inputField_verify}>
              <label>Verification Code:</label>
              <input
                className={verify.textField_verify}
                type="text"
                placeholder="XXXXXX"
              />
            </div>
            <div className={verify.verifyButtons}>
              <button
                className={verify.backButton}
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
