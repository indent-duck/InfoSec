import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/manageForms.module.css";

export default function ManageForms() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        if (!auth.user || !auth.user.token) {
          navigate("/");
          return;
        }
        
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/forms`,
          {
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setForms(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error("Error fetching forms", err);
      }
    };
    fetchForms();
  }, [auth.user, navigate]);

  const filteredForms = forms
    .filter((form) =>
      form.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((form) =>
      filter === "all" ? true : form.status?.toLowerCase() === filter
    );

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
          <div className={styles.searchFilters}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search forms by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.searchBtn}>Search</button>
              <button
                className={styles.clearBtn}
                onClick={() => setSearchTerm("")}
              >
                Clear
              </button>
            </div>
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
          </div>

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
                {filteredForms.map((form) => {
                  const isExpired = new Date(form.expiresAt) <= new Date();
                  const displayStatus =
                    form.status === "closed"
                      ? "closed"
                      : isExpired
                      ? "expired"
                      : "active";

                  return (
                    <tr key={form._id}>
                      <td>{form.title}</td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            displayStatus === "active"
                              ? styles.active
                              : displayStatus === "closed"
                              ? styles.closed
                              : styles.expired
                          }`}
                        >
                          {displayStatus.charAt(0).toUpperCase() +
                            displayStatus.slice(1)}
                        </span>
                      </td>
                      <td>
                        {form.createdAt
                          ? new Date(form.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        {form.expiresAt
                          ? new Date(form.expiresAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>
                        <button
                          className={styles.actionBtn}
                          onClick={() => navigate(`/admin/forms/${form._id}`)}
                        >
                          Details
                        </button>
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
