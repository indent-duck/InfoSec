import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import styles from "./login.module.css";

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/accounts/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login Failed");
      }
      localStorage.setItem("token", data.token);
      auth.login({ token: data.token });

      const decoded = jwtDecode(data.token);
      if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputField}>
            <label>Password:</label>
            <input
              className={styles.textField}
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className={styles.errorMessage}>{error}</p>
          <button className={styles.button} type="submit">
            Log In
          </button>
          <div className={styles.signup}>
            <p>Don't have an account?</p>
            <Link to="/signup/email" className={styles.highlight}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
