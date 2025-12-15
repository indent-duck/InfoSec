import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./submission.css";

export default function Submission() {
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleConfirmSubmit = () => {
    // encryption + API call later

    // Simulate token invalidation
    login({
      ...user,
      tokenCount: 0,
    });

    setShowConfirm(false);
    setShowSuccess(true);
  };

  return (
    <div className="submission-container">
      {/* Header */}
      <header className="home-header">
        <h1>WebName</h1>
        <div className="profile-circle"></div>
      </header>

      {/* Submission Box */}
      <div className="submission-card">
        <h2 className="submission-title">Submission Page</h2>

        <textarea
          placeholder="Write your submission / evaluation here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="submit-btn"
          disabled={!message.trim()}
          onClick={() => setShowConfirm(true)}
        >
          Submit
        </button>
      </div>

      <button className="back-btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Are you sure you want to submit your evaluation?</h2>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-btn"
                onClick={handleConfirmSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal">
            <img src="check.png"></img>
            <h2>Submission Successful</h2>
            <p>Your evaluation has been securely submitted.</p>

            <button
              className="confirm-btn"
              onClick={() => navigate("/home")}
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
