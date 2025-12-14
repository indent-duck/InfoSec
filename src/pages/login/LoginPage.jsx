import React from "react";
import styles from "./login.module.css";

function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h1>Log in</h1>
        <form className={styles.loginForm}>
          <div className={styles.inputField}>
            <label>Email address:</label>
            <input
              className={styles.textField}
              type="text"
              placeholder="Enter your Email Address"
            />
          </div>
          <div className={styles.inputField}>
            <label>Password: </label>
            <input
              className={styles.textField}
              type="password"
              placeholder="Enter your phone number or Email"
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
