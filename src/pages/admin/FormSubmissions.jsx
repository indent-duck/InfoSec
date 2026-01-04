import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/viewSubmissions.module.css";

export default function FormSubmissions() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [formTitle, setFormTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth.user || !auth.user.token) {
          navigate("/");
          return;
        }

        // Fetch form details
        const formResponse = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/forms/${formId}`,
          { headers: { Authorization: `Bearer ${auth.user.token}` } }
        );
        if (formResponse.ok) {
          const formData = await formResponse.json();
          setFormTitle(formData.title);
        }

        // Fetch submissions for this specific form
        const submissionsResponse = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/submissions/form/${formId}`,
          { headers: { Authorization: `Bearer ${auth.user.token}` } }
        );
        if (submissionsResponse.ok) {
          const submissionsData = await submissionsResponse.json();
          setSubmissions(submissionsData.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [formId, auth.user, navigate]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>View Submissions</h1>
        <div className={styles.filters}>
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
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <button
              className={styles.backBtn}
              onClick={() => navigate("/admin/submissions")}
              style={{ marginRight: "15px", marginBottom: "0" }}
            >
              ← Back
            </button>
            <h2 style={{ margin: "0" }}>Submissions for: {formTitle}</h2>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr
                    key={submission._id}
                    onClick={() =>
                      navigate(`/admin/submissions/view/${submission._id}`)
                    }
                    className={styles.clickableRow}
                  >
                    <td>{submission.token}</td>
                    <td>
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          submission.reviewed ? styles.reviewed : styles.pending
                        }`}
                        style={{
                          backgroundColor: submission.reviewed ? "#5cb85c" : "#ffc107",
                          color: submission.reviewed ? "white" : "#212529",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}
                      >
                        {submission.reviewed ? "Reviewed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
