import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./submission.css";

export default function Submission() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔹 Placeholder questions (TEMPORARY)
  const placeholderQuestions = [
    "How satisfied are you with the system?",
    "What features did you find useful?",
    "What can be improved?",
  ];

  // Store answers per question
  const [answers, setAnswers] = useState({});

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const isFormValid = placeholderQuestions.every(
    (_, index) => answers[index]?.trim()
  );

  // TEMP submit handler (no backend yet)
  const handleConfirmSubmit = () => {
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

      {/* Form Card */}
      <div className="submission-card">
        <h2 className="submission-title">Evaluation Form</h2>
        <p className="submission-subtitle">
          Please answer the questions below.
        </p>

        {/* Google Forms–style questions */}
        {placeholderQuestions.map((question, index) => (
          <div className="question-block" key={index}>
            <label className="question-label"> 
              {index + 1}. {question}
            </label>

            <textarea
              className="answer-input"
              placeholder="Your answer"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}

        <button
          className="submit-btn"
          disabled={!isFormValid}
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
            <img src="check.png" alt="Success" />
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
