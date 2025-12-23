
const AllSubmitList = (props) => {

    const Sublist = props.Sumbitlist;
    return (
        <div className="Sumbitlist">
            <div>
                {Submit.map((Sublist) => (
                    <div className ="Submit-list" key={Sublist.Id}>   
                    <table>
                    <tr>
                        <th>{Sublist.Id}</th>
                        <th>{Sublist.EnMess}</th>
                        <th>{Sublist.Date}</th>
                        <th>{Sublist.Action}</th>
                    </tr>
                </table>
                </div>

                ))}
                
            </div>
        </div>
    )
}

export default AllSubmitList;