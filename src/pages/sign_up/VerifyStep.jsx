import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SignupCounter from "../../components/SignupCounter";
import styles from "./modules/wrapper.module.css";
import verify from "./modules/verifystep.module.css";

export default function VerifyStep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/accounts/verify-otp`, {
        email,
        otp
      });
      navigate("/signup/password", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOTP = async () => {
    setLoading(true);
    setError("");
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/accounts/send-otp`, {
        email
      });
      alert("OTP resent successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
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
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>
            {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            <div className={verify.verifyButtons}>
              <button
                className={verify.backButton}
                id="backButton"
                type="button"
                onClick={() => navigate("/signup/email")}
              >
                Back
              </button>
              <button className={styles.button} type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify"}
              </button>
            </div>
            <div style={{textAlign: 'center', marginTop: '10px'}}>
              <button 
                type="button" 
                onClick={handleResendOTP}
                style={{background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer'}}
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
