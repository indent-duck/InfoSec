import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/userManagement.module.css";

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        const filtered = usersArray.filter((u) => u.role === "user")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
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
                console.log(`Tokens for user ${user._id}:`, tokens);
                console.log(`Sample token structure:`, tokens[0]);
                const tokenCount = tokens.length;
                console.log(`Total tokens for user ${user._id}:`, tokenCount);
                return { ...user, tokenCount };
              } else {
                console.log(`Failed to fetch tokens for user ${user._id}:`, tokenResponse.status);
              }
              return { ...user, tokenCount: 0 };
            } catch (err) {
              console.error(`Error fetching tokens for user ${user._id}:`, err);
              return { ...user, tokenCount: 0 };
            }
          })
        );
        
        console.log('Final users with tokens:', usersWithTokens);
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

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by email address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button 
              className={styles.clearBtn}
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          </div>
          
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
                {filteredUsers.map((user) => {
                  console.log('Rendering user:', user.email, 'with tokens:', user.tokenCount);
                  return (
                    <tr key={user._id}>
                      <td>{user.studentNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.tokenCount ?? 0}</td>
                      <td>
                        <button className={styles.editBtn} onClick={() => navigate(`/admin/users/${user._id}`)}>Details</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              filteredUsers.length === 0 && users.length > 0 && searchTerm ? 
                <p>No users found matching your search.</p> : 
                filteredUsers.length === 0 && users.length === 0 ?
                <p>No users found.</p> : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
