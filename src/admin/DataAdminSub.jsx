import { useState } from "react";
import SubmissionTable from "../components/SubmissionTable";
import Style from "./DataAdmin.module.css";
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
    <div>
      <h2>WebName</h2>
      <p className={Style.Totalsub}>Total Submissions:{submissions.length}</p>
      <div className={Style.searchbar}>

        <input className={Style.idle}
          type="text"
          placeholder="Search Submissions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className={Style.buttonngfilter}>Filter</button>
        <button className={Style.buttonngsearch}>Search</button>
        <button className={Style.buttonngclear} onClick={() => setSearch("")}> Clear </button>
      </div>


      {/* Table */}
      <SubmissionTable data={filtered} />
    </div>
  );
};

export default DataAdminSub;
