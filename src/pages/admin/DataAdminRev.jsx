import Style from "./DataAdminRev.module.css";


const DataAdminRev = () => {
    return (
        <div className={Style.home_container}>
            <header className={Style.home_header}>
                <h1>WebName</h1>
                <div className={Style.profile_circle}></div>
            </header>
            <div className={Style.table}>
                <div className={Style.total_container}>
                    <div className={Style.review}>
                        <p>Review Submissions: 1000</p>
                    </div>
                    <div className={Style.btn}>
                        <button> Generate Report</button>
                    </div>
                </div>
                
            </div>
        </div>

    );
}

export default DataAdminRev;