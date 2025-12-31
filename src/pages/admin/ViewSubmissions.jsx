import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/viewSubmissions.module.css";

export default function ViewSubmissions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const forms = [
    { id: 1, title: "Course Evaluation", status: "open", submissions: 45, created: "2024-01-15" },
    { id: 2, title: "Faculty Feedback", status: "closed", submissions: 12, created: "2024-01-20" },
    { id: 3, title: "Student Survey", status: "expired", submissions: 123, created: "2024-01-10" }
  ];

  const filteredForms = filter === "all" ? forms : forms.filter(f => f.status.toLowerCase() === filter);

  const handleFormClick = (formId) => {
    navigate(`/admin/submissions/${formId}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>View Submissions</h1>
        <div className={styles.filters}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
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
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredForms.map(form => (
                  <tr key={form.id} onClick={() => handleFormClick(form.id)} className={styles.clickableRow}>
                    <td>{form.title}</td>
                    <td><span className={`${styles.status} ${styles[form.status.toLowerCase()]}`}>{form.status}</span></td>
                    <td>{form.submissions}</td>
                    <td>{form.created}</td>
                    <td>
                      <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); handleFormClick(form.id); }}>View Submissions</button>
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