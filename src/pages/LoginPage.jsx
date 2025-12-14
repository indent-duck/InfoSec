import React from "react";
import styles from "./login.modules.css";

function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h3>Log in</h3>
        <div className={styles.loginForm}></div>
      </div>
    </div>
  );
}

export default LoginPage;
