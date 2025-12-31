import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/userManagement.module.css";

export default function UserManagement() {
  const [filter, setFilter] = useState("all");

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", lastLogin: "2024-01-22" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active", lastLogin: "2024-01-21" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", lastLogin: "2024-01-15" }
  ];

  const filteredUsers = filter === "all" ? users : users.filter(u => u.role.toLowerCase() === filter);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>User Management</h1>
        <div className={styles.actions}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button className={styles.inviteBtn}>+ Invite User</button>
        </div>
      </header>

      <div className={styles.mainContent}>
        <AdminSidebar />
        
        <div className={styles.content}>
          <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className={`${styles.role} ${styles[user.role.toLowerCase()]}`}>{user.role}</span></td>
                <td><span className={`${styles.status} ${styles[user.status.toLowerCase()]}`}>{user.status}</span></td>
                <td>{user.lastLogin}</td>
                <td>
                  <button className={styles.editBtn}>Edit</button>
                  <button className={styles.resetBtn}>Reset Password</button>
                  <button className={styles.deleteBtn}>Deactivate</button>
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