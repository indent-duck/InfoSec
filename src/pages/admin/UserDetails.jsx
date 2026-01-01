import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/createForm.module.css";

export default function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenCount, setTokenCount] = useState(0);

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
        
        // Fetch token count for this user
        if (foundUser) {
          const tokenResponse = await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/tokens/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (tokenResponse.ok) {
            const tokens = await tokenResponse.json();
            const unusedTokens = tokens.filter(t => !t.used).length;
            setTokenCount(unusedTokens);
          }
        }
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <button
              className={styles.backBtn}
              onClick={() => navigate("/admin/users")}
            >
              ← Back to Users
            </button>
            <h2 style={{ margin: "0", textAlign: "center", flex: "1" }}>User Details</h2>
            <div style={{ width: "150px" }}></div>
          </div>
          
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
              value={tokenCount}
              readOnly
            />

            <label>Created At</label>
            <input
              type="date"
              value={user.createdAt ? new Date(user.createdAt).toISOString().slice(0, 10) : ""}
              readOnly
            />
          </div>
          
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <button
              className={styles.deleteBtn}
              onClick={async () => {
                if (confirm("Are you sure you want to delete this user? This will also delete all their unused tokens.")) {
                  try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(
                      `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/accounts/${userId}`,
                      {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    if (response.ok) {
                      alert("User deleted successfully");
                      navigate("/admin/users");
                    }
                  } catch (err) {
                    console.error("Error deleting user:", err);
                  }
                }
              }}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}