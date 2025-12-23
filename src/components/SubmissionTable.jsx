const SubmissionTable = ({ data }) => {
  return (
    <table className="submission-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Encrypted Message</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(subs => (
          <tr key={subs.id}>
            <td>{subs.id}</td>
            <td>{subs.msg}</td>
            <td>{subs.date}</td>
            <td>
              <button className="link-btn">View</button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionTable;
