import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/manageForms.module.css";

export default function ManageForms() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/forms`,
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Manage Forms</h1>
        <button
          className={styles.createBtn}
          onClick={() => navigate("/admin/forms/create")}
        >
          + Create New Form
        </button>
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
                  <th>Created</th>
                  <th>Expiry</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => {
                  const isActive = new Date(form.expiresAt) > new Date();
                  return (
                    <tr key={form._id}>
                      <td>{form.title}</td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            isActive ? styles.active : styles.expired
                          }`}
                        >
                          {isActive ? "Active" : "Expired"}
                        </span>
                      </td>
                      <td>
                        {form.createdAt
                          ? new Date(form.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        {form.createdAt
                          ? new Date(form.expiresAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        <button className={styles.actionBtn}>Details</button>
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
