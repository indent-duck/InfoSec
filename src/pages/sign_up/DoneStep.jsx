import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SignupCounter from "../../components/SignupCounter";
import styles from "./signupSteps.module.css";

export default function DoneStep() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // demo login
    auth.login({
      role: "user",
      tokenCount: 1, // one-time token per period
    });
    navigate("/home");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.FormContainer}>
        <h1>Sign up</h1>
        <SignupCounter stepNo={3} />
        <form className={styles.Form} onSubmit={handleSubmit}>
          <h2 className={styles.FormTitle}>Account Creation Confirmed</h2>
          <div className={styles.FormBody}>
            <button className={styles.button} type="submit">
              Proceed to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
