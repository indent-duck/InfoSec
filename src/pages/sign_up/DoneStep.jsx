import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SignupCounter from "../../components/SignupCounter";
import styles from "./modules/wrapper.module.css";

export default function DoneStep() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email) {
      try {
        const password = sessionStorage.getItem('signupPassword');
        
        if (password) {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/accounts/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          
          if (response.ok) {
            const { token } = await response.json();
            const decoded = JSON.parse(atob(token.split('.')[1]));
            
            auth.login({
              token,
              id: decoded.id,
              role: decoded.role
            });
            
            sessionStorage.removeItem('signupPassword');
            navigate("/home");
            return;
          }
        }
      } catch (err) {
        console.error("Auto-login failed:", err);
      }
    }
    
    // Fallback: demo login
    auth.login({
      role: "user",
      token: "demo-token",
      id: "demo-user-id",
      tokenCount: 1,
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
