import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./modules/emailstep.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/accounts/send-otp`, {
        email
      });
      navigate("/signup/verify", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
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
              type="email"
              name="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Sending..." : "Sign Up"}
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
