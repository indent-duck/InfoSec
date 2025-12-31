import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/createForm.module.css";

export default function CreateForm() {
  const navigate = useNavigate();

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
    console.log("submit clicked");

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    console.log("API_URL:", API_URL);

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
      const token = localStorage.getItem("token");
      console.log("Token:", token ? "Present" : "Missing");
      
      const response = await fetch(
        `${API_URL}/api/forms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Form created", data);
      navigate("/admin");
    } catch (err) {
      console.error("Error creating form: ", err);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Create Evaluation Form</h1>
      </header>

      <div className={styles.mainContent}>
        <AdminSidebar />
        
        <div className={styles.content}>
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

            <button type="button" className={styles.addBtn} onClick={addQuestion}>
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