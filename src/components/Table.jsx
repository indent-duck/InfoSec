import styles from "./modules/table.module.css";

export default function Table() {
  return (
    <table className={styles.table}>
      <colgroup>
        <col style={{ width: "20%" }} />
        <col style={{ width: "40%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "20%" }} />
      </colgroup>
      <thead className={styles.table_head}>
        <tr>
          <th>ID</th>
          <th>Encrypted Message</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className={styles.table_body}>
        <tr>
          <td>1</td>
          <td>Encrypted Message</td>
          <td>2021-09-01</td>
          <td>
            <button className={styles.button}>View</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
