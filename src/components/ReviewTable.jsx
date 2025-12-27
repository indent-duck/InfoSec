import Style from "./ReviewTable.module.css";
const ReviewTable = () => {
    return (
        <div>
           <table className={Style.wholetable}>
                 <colgroup>
                  <col Style={{ width: "15%" }} />
                  <col Style={{ width: "30%" }} />
                  <col Style={{ width: "20%" }} />
                  <col Style={{ width: "20%" }} />  
                  <col Style={{ width: "15%" }} />
                </colgroup>
                <thead className={Style.table_head}>
                  <tr>
                    <th>Review ID</th>
                    <th>Plaintext</th>
                    <th>Date</th>
                    <th>Reviewed By</th>
                    <th>Action</th>
                    
                  </tr>
                </thead>
                <tbody className={Style.table_body}>
                    <tr >
                      <td>1001</td>
                      <td>Plaintext</td>
                      <td>2025-25-25</td>
                      <td>dwightpogi</td>
                      <td>
                        <button className={Style.link_btn}>View</button>
                      </td>
                    </tr>

                </tbody>
              </table>
    
        </div>
    )
}

export default ReviewTable;