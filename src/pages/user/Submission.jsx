import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./submission.css";

export default function Submission() {
  const navigate = useNavigate();
  const location = useLocation();

  const { formId, title } = location.state || {};

  // 🔹 Placeholder questions per form
  const questionBank = {
    "01111": [
      "How satisfied are you with the system?",
      "Was the interface easy to use?",
      "What can be improved?",
    ],
    "01110": [
      "How would you rate the service?",
      "Was your concern addressed properly?",
      "Any additional feedback?",
    ],
  };

  const questions =
    questionBank[formId] || [
      "How was your experience?",
      "What did you like?",
      "What should be improved?",
    ];

  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const isFormValid = questions.every(
    (_, index) => answers[index]?.trim()
  );

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
        <h2 className="submission-title">
          {title || "Evaluation Form"}
        </h2>

        <p className="submission-subtitle">
          Please answer the questions below.
        </p>

        {questions.map((question, index) => (
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
            <h2>Are you sure you want to submit?</h2>

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
