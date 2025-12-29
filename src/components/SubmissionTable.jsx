import Style from "./SubmissionTable.module.css";
const SubmissionTable = ({ data }) => {
  return (
    <table className={Style.wholetable}>
      <colgroup>
        <col Style={{ width: "15%" }} />
        <col Style={{ width: "20%" }} />
        <col Style={{ width: "20%" }} />
        <col Style={{ width: "20%" }} />
        <col Style={{ width: "15%" }} />
        <col Style={{ width: "15%" }} />
      </colgroup>
      <thead className={Style.table_head}>
        <tr>
          <th>Submision ID</th>
          <th>Form Title</th>
          <th>Email</th>
          <th>Submitted At</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className={Style.table_body}>
        {data.map(subs => (
          <tr key={subs.id}>
            <td>{subs.id}</td>
            <td>{subs.msg}</td>
            <td>{subs.date}</td>
            <td>
              <button className={Style.link_btn}>View</button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionTable;
