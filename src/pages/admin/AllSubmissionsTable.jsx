import styles from "./adminTable.module.css";

export default function AllSubmissionsTable({ submissions }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Encrypted Message</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.encrypted}</td>
            <td>{s.date}</td>
            <td>
              <button className={styles.viewBtn}>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
