import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./submission.css";

export default function Submission() {
  const navigate = useNavigate();

  const { formId } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        console.log("Fetching form with ID:", formId);
        console.log("API URL:", API_URL);
        console.log("Token:", token ? "Present" : "Missing");
        
        const response = await fetch(
          `${API_URL}/api/forms/${formId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error response:", errorText);
          throw new Error("Failed to fetch form data");
        }
        const data = await response.json();
        console.log("Form data:", data);
        setForm(data);
      } catch (err) {
        console.error("Error fetching form: ", err);
      }
    };
    fetchForm();
  }, [formId]);

  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const isFormValid = form?.questions.every((_, index) =>
    answers[index]?.trim()
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
        <h2 className="submission-title">{form?.title || "Evaluation Form"}</h2>

        <p className="submission-subtitle">
          Please answer the questions below.
        </p>

        {form?.questions.map((question, index) => (
          <div className="question-block" key={index}>
            <label className="question-label">
              {index + 1}. {question.text}
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
              <button className="confirm-btn" onClick={handleConfirmSubmit}>
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

            <button className="confirm-btn" onClick={() => navigate("/home")}>
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
