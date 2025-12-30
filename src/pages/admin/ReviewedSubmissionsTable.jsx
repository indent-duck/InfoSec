import styles from "./adminTable.module.css";

export default function ReviewedSubmissionsTable({ reviews }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Review ID</th>
          <th>Plaintext</th>
          <th>Date Reviewed</th>
          <th>Reviewed By</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.plaintext}</td>
            <td>{r.date}</td>
            <td>{r.admin}</td>
            <td>
              <button className={styles.viewBtn}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
