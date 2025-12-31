import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/userManagement.module.css";

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/accounts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const contentType = response.headers.get("content-type") || "";
        let data;
        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (!response.ok) {
          console.error("Failed to fetch users", response.status, data);
          setError(`Failed to fetch users: ${response.status}`);
          return;
        }

        const usersArray = Array.isArray(data) ? data : data.accounts || [];
        const filtered = usersArray.filter((u) => u.role === "user");
        
        // Fetch token counts for each user
        const usersWithTokens = await Promise.all(
          filtered.map(async (user) => {
            try {
              const tokenResponse = await fetch(
                `${
                  import.meta.env.VITE_API_URL || "http://localhost:5000"
                }/api/tokens/user/${user._id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              if (tokenResponse.ok) {
                const tokens = await tokenResponse.json();
                const unusedTokens = tokens.filter(t => !t.used).length;
                return { ...user, unusedTokens };
              }
              return { ...user, unusedTokens: 0 };
            } catch (err) {
              console.error(`Error fetching tokens for user ${user._id}:`, err);
              return { ...user, unusedTokens: 0 };
            }
          })
        );
        
        setUsers(usersWithTokens);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>User Management</h1>
        <div className={styles.actions}>
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
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Student Number</th>
                  <th>Email</th>
                  <th>Tokens</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.studentNumber}</td>
                    <td>{user.email}</td>
                    <td>{user.unusedTokens ?? 0}</td>
                    <td>
                      <button className={styles.editBtn} onClick={() => navigate(`/admin/users/${user._id}`)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              users.length === 0 && <p>No users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
