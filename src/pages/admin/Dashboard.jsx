import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/dashboard.module.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [stats, setStats] = useState({
    totalForms: 0,
    activeForms: 0,
    totalSubmissions: 0,
    pendingReviews: 0
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!auth.user || !auth.user.token) {
          navigate("/");
          return;
        }
        
        // Fetch forms
        const formsResponse = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/forms`,
          { headers: { Authorization: `Bearer ${auth.user.token}` } }
        );
        
        if (formsResponse.ok) {
          const forms = await formsResponse.json();
          const activeForms = forms.filter(f => 
            f.status !== "closed" && new Date(f.expiresAt) > new Date()
          ).length;
          
          // Fetch all submissions
          const submissionsPromises = forms.map(async (form) => {
            const submissionResponse = await fetch(
              `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/submissions/form/${form._id}`,
              { headers: { Authorization: `Bearer ${auth.user.token}` } }
            );
            if (submissionResponse.ok) {
              const submissions = await submissionResponse.json();
              return submissions.map(s => ({ ...s, formTitle: form.title }));
            }
            return [];
          });
          
          const allSubmissions = (await Promise.all(submissionsPromises)).flat();
          const pendingReviews = allSubmissions.filter(s => !s.reviewed).length;
          
          setStats({
            totalForms: forms.length,
            activeForms,
            totalSubmissions: allSubmissions.length,
            pendingReviews
          });
          
          // Get active forms with submission counts
          const activeFormsList = await Promise.all(
            forms.filter(f => f.status !== "closed" && new Date(f.expiresAt) > new Date())
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map(async (form) => {
                const submissionResponse = await fetch(
                  `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/submissions/form/${form._id}`,
                  { headers: { Authorization: `Bearer ${auth.user.token}` } }
                );
                if (submissionResponse.ok) {
                  const submissions = await submissionResponse.json();
                  return { ...form, submissionCount: submissions.length };
                }
                return { ...form, submissionCount: 0 };
              })
          );
          setRecentSubmissions(activeFormsList);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [auth.user, navigate]);

  const statsCards = [
    { title: "Total Forms", value: stats.totalForms, color: "#2729AC" },
    { title: "Active Forms", value: stats.activeForms, color: "#348FDF" },
    { title: "Total Submissions", value: stats.totalSubmissions, color: "#15A810" },
    { title: "Pending Reviews", value: stats.pendingReviews, color: "#FF6B35" },
  ];

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error loading dashboard: {error}</div>;

  return (
    <div className={styles.container} style={{ overflow: "hidden" }}>
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

      <div className={styles.mainContent} style={{ overflow: "hidden" }}>
        <AdminSidebar />

        <div className={styles.content}>
          <div className={styles.statsGrid}>
            {statsCards.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <h3 style={{ color: stat.color }}>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            ))}
          </div>
          
          <div className={styles.recentSubmissions} style={{ marginTop: "5px" }}>
            <h3>Active Forms</h3>
            <div className={styles.tableContainer} style={{ border: "2px solid #dee2e6" }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Form Title</th>
                    <th>Created</th>
                    <th>Expires</th>
                    <th>Submissions</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((form) => (
                    <tr key={form._id}>
                      <td>{form.title}</td>
                      <td>{new Date(form.createdAt).toLocaleDateString()}</td>
                      <td>{new Date(form.expiresAt).toLocaleDateString()}</td>
                      <td>{form.submissionCount || 0}</td>
                      <td>
                        <span
                          className={styles.status}
                          style={{
                            backgroundColor: "#5cb85c",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500"
                          }}
                        >
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
