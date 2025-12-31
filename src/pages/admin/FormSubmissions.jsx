import { useParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/viewSubmissions.module.css";

export default function FormSubmissions() {
  const { formId } = useParams();

  const submissions = [
    { id: 1, submitter: "john@example.com", date: "2024-01-22", status: "New" },
    {
      id: 2,
      submitter: "jane@example.com",
      date: "2024-01-21",
      status: "Reviewed",
    },
    {
      id: 3,
      submitter: "bob@example.com",
      date: "2024-01-20",
      status: "Archived",
    },
  ];

  const formTitle = "Course Evaluation"; // This would come from API

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Submissions for: {formTitle}</h1>
        <div className={styles.filters}>
          <button className={styles.exportBtn}>Export CSV</button>
        </div>
      </header>

      <div className={styles.mainContent}>
        <AdminSidebar />

        <div className={styles.content}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Submitter</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>#{submission.id}</td>
                    <td>{submission.submitter}</td>
                    <td>{submission.date}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[submission.status.toLowerCase()]
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td>
                      <button className={styles.actionBtn}>View Details</button>
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
