import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/createForm.module.css";

export default function CreateForm() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [season, setSeason] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [questions, setQuestions] = useState([""]);

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const updateQuestion = (index, value) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user || !auth.user.token) {
      navigate("/");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    if (new Date(expiresAt) <= new Date()) {
      alert("Invalid expiration date, Please select a future date.");
      return;
    }

    const payload = {
      title,
      description,
      season,
      expiresAt,
      questions: questions.map((q) => ({ text: q })),
    };

    try {
      const response = await fetch(`${API_URL}/api/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      navigate("/admin");
    } catch (err) {
      console.error("Error creating form: ", err);
      alert("Error creating form. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Forms</h1>
        <div className={styles.headerActions}>
          <button
            className={styles.createBtn}
            onClick={() => navigate("/admin/forms")}
          >
            ← Back to Forms
          </button>
        </div>
      </header>

      <div className={styles.mainContent}>
        <AdminSidebar />

        <div className={styles.content}>
          <h2>Create Form</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>Season</label>
            <input
              placeholder="e.g. AY 2025–2026"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              required
            />

            <label>Expiration Date</label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              required
            />

            <h3>Questions</h3>

            {questions.map((q, i) => (
              <div key={i} className={styles.questionRow}>
                <input
                  placeholder={`Question ${i + 1}`}
                  value={q}
                  onChange={(e) => updateQuestion(i, e.target.value)}
                  required
                />
                <button type="button" onClick={() => removeQuestion(i)}>
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              className={styles.addBtn}
              onClick={addQuestion}
            >
              + Add Question
            </button>

            <div className={styles.actions}>
              <button type="button" onClick={() => navigate("/admin")}>
                Cancel
              </button>
              <button type="submit">Create Form</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
