import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/viewSubmissions.module.css";

export default function ViewSubmissions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/forms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setForms(data);
      } catch (err) {
        console.error("Error fetching forms", err);
      }
    };
    fetchForms();
  }, []);

  const filteredForms =
    filter === "all"
      ? forms
      : forms.filter((f) => f.status?.toLowerCase() === filter);

  const handleFormClick = (formId) => {
    navigate(`/admin/submissions/${formId}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>View Submissions</h1>
        <div className={styles.filters}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="expired">Expired</option>
          </select>
          <button className={styles.exportBtn}>Export All</button>
        </div>
      </header>

      <div className={styles.mainContent}>
        <AdminSidebar />

        <div className={styles.content}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Form Title</th>
                  <th>Status</th>
                  <th>Submissions</th>
                  <th>Expiry</th>
                </tr>
              </thead>
              <tbody>
                {filteredForms.map((form) => {
                  const isActive = new Date(form.expiresAt) > new Date();
                  return (
                    <tr
                      key={form._id}
                      onClick={() => handleFormClick(form._id)}
                      className={styles.clickableRow}
                    >
                      <td>{form.title}</td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            isActive ? styles.open : styles.expired
                          }`}
                        >
                          {isActive ? "Active" : "Expired"}
                        </span>
                      </td>
                      <td>{form.submissions || 0}</td>
                      <td>
                        {form.expiresAt
                          ? new Date(form.expiresAt).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
