import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./home.profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/accounts/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-container">
      <div className="top-bar">
        <h1 className="web-name">Profile</h1>

      </div>

      <div className="account-card">
        <div className="profile-section">
          <div className="profile-avatar"></div>
          <div className="profile-info">
            <h2>{profile.studentNumber || profile.email}</h2>
            <p>Joined on {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="info-section">
          <h3>User Information</h3>
          <div className="info-grid">
            <div className="info-field">
              <label>Student Number</label>
              <input type="text" value={profile.studentNumber || "N/A"} readOnly />
            </div>
            <div className="info-field">
              <label>Email</label>
              <input type="text" value={profile.email} readOnly />
            </div>
            <div className="info-field">
              <label>Role</label>
              <input type="text" value={profile.role} readOnly />
            </div>
          </div>
        </div>

        <div className="password-section">
          <label>Password</label>
          <input
            type="text"
            value={profile.passwordHash}
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