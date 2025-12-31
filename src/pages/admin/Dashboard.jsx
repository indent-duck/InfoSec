import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/dashboard.module.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: "Total Forms", value: "12", color: "#2729AC" },
    { title: "Active Forms", value: "8", color: "#348FDF" },
    { title: "Total Submissions", value: "156", color: "#15A810" },
    { title: "Pending Reviews", value: "23", color: "#FF6B35" },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
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
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <h3 style={{ color: stat.color }}>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
