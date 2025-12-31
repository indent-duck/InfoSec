import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/createForm.module.css";

export default function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/accounts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        const usersArray = Array.isArray(data) ? data : data.accounts || [];
        const foundUser = usersArray.find(u => u._id === userId);
        setUser(foundUser);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>User Management</h1>
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
          <h2>User Details</h2>
          <button className={styles.backBtn} onClick={() => navigate("/admin/users")}>
            ← Back to Users
          </button>
          
          <div className={styles.form}>
            <label>Student Number</label>
            <input
              value={user.studentNumber || ""}
              readOnly
            />

            <label>Email</label>
            <input
              value={user.email || ""}
              readOnly
            />

            <label>Role</label>
            <input
              value={user.role || ""}
              readOnly
            />

            <label>Unused Tokens</label>
            <input
              value={user.unusedTokens || 0}
              readOnly
            />

            <label>Created At</label>
            <input
              type="date"
              value={user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 10) : ""}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}