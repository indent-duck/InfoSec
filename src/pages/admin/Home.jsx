import { useState } from "react";
import styles from "./home.module.css";
import Card from "../../components/Card";

import AllSubmissionsTable from "./AllSubmissionsTable";
import ReviewedSubmissionsTable from "./ReviewedSubmissionsTable";

export default function HomeAdmin() {
  const [activeTab, setActiveTab] = useState("all");

  // TEMP DATA (replace with API later)
  const allSubmissions = [
    { id: "01111", encrypted: "5f7a9c1d0a", date: "2025-07-16" },
    { id: "01110", encrypted: "5f7a9c1d0a", date: "2025-07-14" },
  ];

  const reviewedSubmissions = [
    {
      id: "01111",
      plaintext: "Plaintext message",
      date: "2025-07-16",
      admin: "admin_name",
    },
  ];

  return (
    <div className={styles.home_container}>
      <header className={styles.home_header}>
        <h1>WebName</h1>
        <div className={styles.profile_circle}></div>
      </header>

      <div className={styles.body_card}>

      {/* STAT CARDS */}
      <div className={styles.cards_container}>
        <Card Number={123} Subtitle="Total Submissions" TextColor="#2729AC" />
        <Card Number={123} Subtitle="Remaining Tokens" TextColor="#348FDF" />
        <Card Number={123} Subtitle="Reviewed" TextColor="#15A810" />
      </div>

      {/* TOGGLE BUTTONS */}
      <div className={styles.btn_container}>
        <button
          className={`${styles.btn} ${
            activeTab === "all" ? styles.btn_active : styles.btn_inactive
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Submissions
        </button>

        <button
          className={`${styles.btn} ${
            activeTab === "reviewed" ? styles.btn_active : styles.btn_inactive
          }`}
          onClick={() => setActiveTab("reviewed")}
        >
          Reviewed Submissions
        </button>
      </div>

      {/* TABLE */}
      <div className={styles.table_container}>
        {activeTab === "all" && (
          <AllSubmissionsTable submissions={allSubmissions} />
        )}

        {activeTab === "reviewed" && (
          <ReviewedSubmissionsTable reviews={reviewedSubmissions} />
        )}
      </div>
      </div>
    </div>
  );
}
