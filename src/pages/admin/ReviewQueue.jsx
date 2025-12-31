import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import styles from "./modules/reviewQueue.module.css";

export default function ReviewQueue() {
  const [selectedItems, setSelectedItems] = useState([]);

  const pendingReviews = [
    { id: 1, formTitle: "Course Evaluation", submitter: "student1@example.com", priority: "High", flagged: true, date: "2024-01-22" },
    { id: 2, formTitle: "Faculty Feedback", submitter: "student2@example.com", priority: "Medium", flagged: false, date: "2024-01-21" },
    { id: 3, formTitle: "Student Survey", submitter: "student3@example.com", priority: "Low", flagged: true, date: "2024-01-20" }
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(pendingReviews.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Review Queue</h1>
        <div className={styles.stats}>
          <span className={styles.statItem}>Pending: {pendingReviews.length}</span>
          <span className={styles.statItem}>Selected: {selectedItems.length}</span>
        </div>
      </header>

      {selectedItems.length > 0 && (
        <div className={styles.bulkActions}>
          <button className={styles.approveBtn}>Bulk Approve</button>
          <button className={styles.rejectBtn}>Bulk Reject</button>
          <button className={styles.flagBtn}>Flag Selected</button>
        </div>
      )}

      <div className={styles.mainContent}>
        <AdminSidebar />
        
        <div className={styles.content}>
          <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={selectedItems.length === pendingReviews.length}
                />
              </th>
              <th>Form Title</th>
              <th>Submitter</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingReviews.map(item => (
              <tr key={item.id} className={item.flagged ? styles.flagged : ""}>
                <td>
                  <input 
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </td>
                <td>{item.formTitle}</td>
                <td>{item.submitter}</td>
                <td><span className={`${styles.priority} ${styles[item.priority.toLowerCase()]}`}>{item.priority}</span></td>
                <td>{item.flagged ? "🚩 Flagged" : "Pending"}</td>
                <td>{item.date}</td>
                <td>
                  <button className={styles.approveBtn}>Approve</button>
                  <button className={styles.rejectBtn}>Reject</button>
                  <button className={styles.viewBtn}>Review</button>
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