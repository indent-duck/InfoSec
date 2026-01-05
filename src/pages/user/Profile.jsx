import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./home.profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.user || !auth.user.token) {
          navigate("/");
          return;
        }
        
        // If this is an admin token, redirect to admin area
        if (auth.user.role === 'admin') {
          navigate("/admin");
          return;
        }
        
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/accounts/profile`,
          { headers: { Authorization: `Bearer ${auth.user.token}` } }
        );
        
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
        navigate("/");
      }
    };

    fetchUserData();
  }, [auth.user, navigate]);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className="account-container">
      <div className="top-bar">
        <h1 className="web-name">Profile</h1>

      </div>

      <div className="account-card">
        <div className="profile-section">
          <div className="profile-avatar"></div>
          <div className="profile-info">
            <h2>{userData?.studentNumber || "Loading..."}</h2>
            <p>Joined on {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "Loading..."}</p>
          </div>
        </div>

        <div className="info-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-field">
              <label>Student Number</label>
              <input type="text" value={userData?.studentNumber || ""} readOnly />
            </div>
            <div className="info-field">
              <label>Email</label>
              <input type="text" value={userData?.email || ""} readOnly />
            </div>
            <div className="info-field">
              <label>Role</label>
              <input type="text" value={userData?.role || ""} readOnly />
            </div>
          </div>
        </div>

        <div className="password-section">
          <label>Password</label>
          <input
            type="text"
            value={userData?.passwordHash || ""}
            readOnly
          />
        </div>

        <div className="button-container">
          <div className="left-button">
            <button className="back-btn" onClick={() => navigate("/home")}>
              Back
            </button>
          </div>
          <div className="right-button">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;