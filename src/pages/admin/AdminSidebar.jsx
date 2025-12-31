import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./modules/adminSidebar.module.css";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <div className={styles.sidebar}>
      <h2>Quick Actions</h2>
      <div className={styles.sidebarActions}>
        <button
          className={`${styles.sidebarBtn} ${
            location.pathname === "/admin" ? styles.active : ""
          }`}
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </button>
        <button
          className={`${styles.sidebarBtn} ${
            location.pathname.startsWith("/admin/forms") ? styles.active : ""
          }`}
          onClick={() => navigate("/admin/forms")}
        >
          Manage Forms
        </button>
        <button
          className={`${styles.sidebarBtn} ${
            location.pathname.startsWith("/admin/submissions")
              ? styles.active
              : ""
          }`}
          onClick={() => navigate("/admin/submissions")}
        >
          View Submissions
        </button>
        <button
          className={`${styles.sidebarBtn} ${
            location.pathname === "/admin/users" ? styles.active : ""
          }`}
          onClick={() => navigate("/admin/users")}
        >
          User Management
        </button>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
