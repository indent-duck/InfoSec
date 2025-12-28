import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./form.module.css";

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

    const payload = {
      title,
      description,
      season,
      expiresAt,
      questions: questions.map((q) => ({ text: q })),
    };

    console.log("FORM DATA:", payload);

    // TODO: POST to backend later
    navigate("/admin");
  };

  return (
    <div className={styles.container}>
      <h1>Create Evaluation Form</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

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
  );
}
