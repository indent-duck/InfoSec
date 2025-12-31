import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./home.profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();

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
            <h2>John Doe</h2>
            <p>Joined on July 16, 2025</p>
          </div>
        </div>

        <div className="info-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-field">
              <label>Full Name</label>
              <input type="text" value="John Doe" readOnly />
            </div>
            <div className="info-field">
              <label>Email</label>
              <input type="text" value="johndoe@gmail.com" readOnly />
            </div>
            <div className="info-field">
              <label>Role</label>
              <input type="text" value="User" readOnly />
            </div>
          </div>
        </div>

        <div className="password-section">
          <label>Password</label>
          <input
            type="text"
            value="ef92b778bafe771e89245b89ecbc08a44a4e166c0665991188f383d4473e94f"
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