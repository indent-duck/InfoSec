import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/viewSubmissions.module.css";

export default function ViewSubmissions() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [forms, setForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          }/api/forms`,
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
        
        // Fetch submission counts for each form
        const formsWithCounts = await Promise.all(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(async (form) => {
            try {
              const submissionResponse = await fetch(
                `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/submissions/form/${form._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log(`Submission response for form ${form._id}:`, submissionResponse.status);
              if (submissionResponse.ok) {
                const submissions = await submissionResponse.json();
                console.log(`Found ${submissions.length} submissions for form ${form._id}`);
                return { ...form, submissions: submissions.length };
              } else {
                console.log(`Failed to fetch submissions for form ${form._id}:`, submissionResponse.status);
              }
              return { ...form, submissions: 0 };
            } catch (err) {
              console.error(`Error fetching submissions for form ${form._id}:`, err);
              return { ...form, submissions: 0 };
            }
          })
        );
        
        setForms(formsWithCounts);
      } catch (err) {
        console.error("Error fetching forms", err);
      }
    };
    fetchForms();
  }, []);

  const filteredForms =
    filter === "all"
      ? forms.filter((form) => 
          form.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : forms.filter((f) => f.status?.toLowerCase() === filter)
          .filter((form) => 
            form.title.toLowerCase().includes(searchTerm.toLowerCase())
          );

  const handleFormClick = (formId) => {
    navigate(`/admin/submissions/${formId}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>View Submissions</h1>
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
                  <th>Submissions</th>
                  <th>Expiry</th>
                </tr>
              </thead>
              <tbody>
                {filteredForms.map((form) => {
                  const isExpired = new Date(form.expiresAt) <= new Date();
                  const displayStatus = form.status === "closed" ? "closed" : (isExpired ? "expired" : "active");
                  
                  return (
                    <tr
                      key={form._id}
                      onClick={() => handleFormClick(form._id)}
                      className={styles.clickableRow}
                    >
                      <td>{form.title}</td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            displayStatus === "active" ? styles.open : 
                            displayStatus === "closed" ? styles.closed :
                            styles.expired
                          }`}
                        >
                          {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
                        </span>
                      </td>
                      <td>{form.submissions || 0}</td>
                      <td>
                        {form.expiresAt
                          ? new Date(form.expiresAt).toLocaleDateString()
                          : "—"}
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
