import { useState } from "react";
import SubmissionTable from "../../components/SubmissionTable";
import Style from "./DataAdminSub.module.css";


const DataAdminSub = () => {
  const [search, setSearch] = useState("");

  const submissions = [
    { id: "0111", msg: "5f7a9c10a", date: "2025-07-16" },
    { id: "0110", msg: "5f7a9c10a", date: "2025-07-14" },
    { id: "0109", msg: "5f7a9c10a", date: "2025-07-12" },
    { id: "0108", msg: "5f7a9c10a", date: "2025-07-11" },
    { id: "0107", msg: "5f7a9c10a", date: "2025-07-11" },
  ];

  const filtered = submissions.filter(subs =>
    subs.id.includes(search)
  );

  return (
    <div className={Style.home_container}>

      <header className={Style.home_header}>
        <h1>WebName</h1>
        <div className={Style.profile_circle}></div>
      </header>

      <div className={Style.table}>
        <p className={Style.TotalSubmissions}>Total Submissions: {submissions.length}</p>
        <div className={Style.sort_con}>
          <div className={Style.search_bar}>
          <input
            type="text"
            placeholder="Search Submissions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          </div>
        <div className={Style.btn_container}>
          <button className={`${Style.btn} ${Style.filter}`} >Filter</button>
          <button className={`${Style.btn} ${Style.search}`} >Search</button>
          <button className={`${Style.btn} ${Style.clear}`} onClick={() => setSearch("")}> Clear </button>
        </div>
        </div>
        <div className={Style.table_con}>
        {/* Table */}
        <SubmissionTable data={filtered}></SubmissionTable>
        </div>
      </div>


    </div>
  );
};

export default DataAdminSub;
