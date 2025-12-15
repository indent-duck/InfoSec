import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./login.module.css";

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP: fake login
    auth.login({
      role: "user",
      tokenCount: 1, // one-time token per period
    });

    navigate("/home");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h1>Log in</h1>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <label>Email address:</label>
            <input
              className={styles.textField}
              type="text"
              placeholder="Enter your Email Address"
            />
          </div>
          <div className={styles.inputField}>
            <label>Password:</label>
            <input
              className={styles.textField}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button className={styles.button} type="submit">
            Log In
          </button>
          <div className={styles.signup}>
            <p>Don't have an account?</p>
            <p className={styles.highlight}>Sign up</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;