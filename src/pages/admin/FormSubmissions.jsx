import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/viewSubmissions.module.css";

export default function FormSubmissions() {
  const { formId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [formTitle, setFormTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch form details
        const formResponse = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/forms/${formId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (formResponse.ok) {
          const formData = await formResponse.json();
          setFormTitle(formData.title);
        }
        
        // Fetch submissions for this specific form
        const submissionsResponse = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/submissions/form/${formId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (submissionsResponse.ok) {
          const submissionsData = await submissionsResponse.json();
          setSubmissions(submissionsData);
        }
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [formId]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Submissions for: {formTitle}</h1>
        <div className={styles.filters}>
          <button className={styles.exportBtn}>Export CSV</button>
        </div>
      </header>

      <div className={styles.mainContent}>
        <AdminSidebar />

        <div className={styles.content}>
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
                  <tr key={submission._id}>
                    <td>{submission.token}</td>
                    <td>{submission.submittedAt}</td>
                    <td>
                      <span
                        className={`${styles.reviewed} ${
                          styles[submission.reviewed.toLowerCase()]
                        }`}
                      >
                        {submission.reviewed}
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