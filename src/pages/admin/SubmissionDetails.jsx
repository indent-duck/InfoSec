import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/submissionDetails.module.css";

export default function SubmissionDetails() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [submission, setSubmission] = useState(null);
  const [form, setForm] = useState(null);
  const [decryptedAnswers, setDecryptedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        if (!auth.user || !auth.user.token) {
          navigate("/");
          return;
        }

        // Fetch submission details
        const submissionResponse = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/submissions/${submissionId}`,
          {
            headers: { Authorization: `Bearer ${auth.user.token}` },
          }
        );

        if (submissionResponse.ok) {
          const submissionData = await submissionResponse.json();
          setSubmission(submissionData);

          // Fetch form details
          const formResponse = await fetch(
            `${
              import.meta.env.VITE_API_URL || "http://localhost:5000"
            }/api/forms/${submissionData.formId}`,
            {
              headers: { Authorization: `Bearer ${auth.user.token}` },
            }
          );

          if (formResponse.ok) {
            const formData = await formResponse.json();
            setForm(formData);

            // Decrypt answers
            const decrypted = await Promise.all(
              submissionData.answers.map(async (answer) => {
                try {
                  const decryptResponse = await fetch(
                    `${
                      import.meta.env.VITE_API_URL || "http://localhost:5000"
                    }/api/submissions/decrypt`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.user.token}`,
                      },
                      body: JSON.stringify({ encryptedText: answer.answer }),
                    }
                  );

                  if (decryptResponse.ok) {
                    const decryptedData = await decryptResponse.json();
                    return {
                      questionIndex: answer.questionIndex,
                      answer: decryptedData.decryptedText,
                    };
                  }
                  return {
                    questionIndex: answer.questionIndex,
                    answer: "Failed to decrypt",
                  };
                } catch (err) {
                  return {
                    questionIndex: answer.questionIndex,
                    answer: "Decryption error",
                  };
                }
              })
            );

            setDecryptedAnswers(decrypted);
          }
        }
      } catch (err) {
        console.error("Error fetching submission:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [submissionId, auth.user, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!submission) return <p>Submission not found</p>;

  return (
    <div className={styles.container} style={{ overflow: "hidden" }}>
      <header className={styles.header}>
        <h1>View Submissions</h1>
        <div className={styles.headerActions}>
          <button
            className={styles.createBtn}
            onClick={() => navigate("/admin/forms/create")}
          >
            + Create New Form
          </button>
        </div>
      </header>

      <div className={styles.mainContent} style={{ overflow: "hidden" }}>
        <AdminSidebar />

        <div className={styles.content}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <button
              className={styles.backBtn}
              onClick={() => navigate(`/admin/submissions/${submission.formId}`)}
            >
              ← Back to Submissions
            </button>
            <h2 style={{ margin: "0", textAlign: "center", flex: "1" }}>Submission Details</h2>
            <div style={{ width: "150px" }}></div>
          </div>

          <div
            className={styles.form}
            style={{ border: "1px solid #777", padding: "30px" }}
          >
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <div style={{ flex: "1", marginRight: "20px" }}>
                <strong>Form Title:</strong> {form?.title || ""}
              </div>
              <div style={{ width: "200px" }}>
                <strong>Submission Date:</strong>{" "}
                {submission.submittedAt
                  ? new Date(submission.submittedAt).toLocaleDateString()
                  : ""}
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <strong>Token:</strong> {submission.token}
            </div>

            <h3>Answers</h3>
            {decryptedAnswers.map((answer, index) => {
              const question = form?.questions[answer.questionIndex];
              return (
                <div key={index} className={styles.questionRow}>
                  <div
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      backgroundColor: "#f8f9fa",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    {question?.text || `Question ${answer.questionIndex + 1}`}
                  </div>
                  <textarea
                    value={answer.answer}
                    readOnly
                    rows="3"
                    style={{ marginBottom: "20px" }}
                  />
                </div>
              );
            })}

            {submission.reviewed ? (
              <div style={{
                width: "calc(100% - 40px)",
                padding: "12px 20px",
                backgroundColor: "#5cb85c",
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "20px",
                border: "none",
                cursor: "default",
                boxShadow: "none",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block"
              }}>
                Reviewed
              </div>
            ) : (
              <button
                className={styles.reviewBtn}
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `${
                        import.meta.env.VITE_API_URL || "http://localhost:5000"
                      }/api/submissions/${submissionId}/review`,
                      {
                        method: "PUT",
                        headers: {
                          Authorization: `Bearer ${auth.user.token}`,
                        },
                      }
                    );
                    if (response.ok) {
                      window.location.reload();
                    }
                  } catch (err) {
                    console.error("Error marking as reviewed:", err);
                  }
                }}
                style={{
                  width: "200px",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Mark as Reviewed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
