import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // send verification code to user email

    navigate("/signup/verify");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.FormContainer}>
        <h1>Sign up</h1>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <label>Email address:</label>
            <input
              className={styles.textField}
              type="text"
              placeholder="Enter your Email Address"
            />
          </div>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
          <div className={styles.checkbox_container}>
            <label>
              <input type="checkbox" className={styles.checkbox} required />
              By creating/or using your account you agree to our Terms of Use
              and Privacy Policy
            </label>
          </div>
          <div className={styles.login}>
            <p>Already have an account?</p>
            <Link to="/home" className={styles.highlight}>
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
