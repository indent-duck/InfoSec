import ReviewTable from "../../components/ReviewTable";
import Style from "./DataAdminRev.module.css";


const DataAdminRev = () => {
    return (
        <div className={Style.home_container}>
            <header className={Style.home_header}>
                <h1>WebName</h1>
                <div className={Style.profile_circle}></div>
            </header>
            {/* dito start dwight */}
            <div className={Style.table}>
                <div className={Style.total_container}>
                    <div className={Style.review}>
                        <p>Review Submissions: 1000</p>
                    </div>
                   
                </div>
                <div className={Style.sort_con}>
                    <div className={Style.search_bar}>
                        <input
                            type="text"
                            placeholder="Search Submissions"
                        />
                    </div>
                    <div className={Style.btn_container}>
                        <button className={`${Style.btn} ${Style.filter}`} >Filter</button>
                        <button className={`${Style.btn} ${Style.search}`} >Search</button>
                        <button className={`${Style.btn} ${Style.clear}`}> Clear </button>
                    </div>
                </div>
                <div className={Style.reviewtable}>
                    <ReviewTable />
                </div>
            </div>
        </div>

    );
}

export default DataAdminRev;