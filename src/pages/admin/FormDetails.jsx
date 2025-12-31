import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/formDetails.module.css";

export default function FormDetails() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [season, setSeason] = useState("");
  const [status, setStatus] = useState("");
  const [created, setCreated] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/forms/${formId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch form");
        }

        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setSeason(data.season);
        setStatus(data.status);
        setCreated(data.createdAt);
        setExpiresAt(data.expiresAt);
        setQuestions(data.questions);
      } catch (err) {
        console.error("Error fetching form", err);
      }
    };

    fetchForm();
  }, [formId]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Forms</h1>
        <div className={styles.headerActions}>
          <button
            className={styles.createBtn}
            onClick={() => navigate("/admin/forms/create")}
          >
            + Create New Form
          </button>
        </div>
      </header>

      <div className={styles.mainContent}>
        <AdminSidebar />
        
        <div className={styles.content}>
          <h2>Form Details</h2>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/admin/forms")}
          >
            ← Back to Forms
          </button>

          <div className={styles.form}>
            <div className={styles.rowFormat}>
              <div className={styles.labelPair}>
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  readOnly
                  style={{ flex: "1" }}
                />
              </div>
              <div className={styles.labelPair}>
                <label>Status</label>
                <input type="text" value={status} readOnly />
              </div>
            </div>

            <label>Description</label>
            <textarea value={description} readOnly />

            <div className={styles.rowFormat}>
              <div className={styles.labelPair}>
                <label>Season</label>
                <input type="text" value={season} readOnly />
              </div>
              <div className={styles.labelPair}>
                <label>Creation Date</label>
                <input
                  type="date"
                  value={
                    created ? new Date(created).toISOString().slice(0, 10) : ""
                  }
                  readOnly
                />
              </div>
              <div className={styles.labelPair}>
                <label>Expiry Date</label>
                <input
                  type="date"
                  value={
                    created
                      ? new Date(expiresAt).toISOString().slice(0, 10)
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>

            <h3>Questions</h3>

            {questions.map((q, i) => (
              <div key={i} className={styles.questionRow}>
                <input
                  placeholder={`Question ${i + 1}`}
                  value={q.text || q}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
