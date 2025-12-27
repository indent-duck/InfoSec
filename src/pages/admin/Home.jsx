import React from "react";
import { useState } from "react";
import styles from "./home.module.css";
import Card from "../../components/Card.jsx";
import Table from "../../components/Table.jsx";

export default function HomeAdmin() {
  const [btnStatus1, setbtnStatus1] = useState("btn_active");
  const [btnStatus2, setbtnStatus2] = useState("btn_inactive");

  const handleClick1 = () => {
    setbtnStatus1("btn_active");
    setbtnStatus2("btn_inactive");
  };

  const handleClick2 = () => {
    setbtnStatus1("btn_inactive");
    setbtnStatus2("btn_active");
  };

  return (
    <div className={styles.home_container}>
      <header className={styles.home_header}>
        <h1>WebName</h1>
        <div className={styles.profile_circle}></div>
      </header>

      <div className={styles.body_card}>
        <div className={styles.cards_container}>
          <Card Number={123} Subtitle={"subtitle"} TextColor={"#2729AC"} />
          <Card Number={123} Subtitle={"subtitle"} TextColor={"#348FDF"} />
          <Card Number={123} Subtitle={"subtitle"} TextColor={"#15A810"} />
        </div>
        <div className={styles.btn_container}>
          <button
            className={`${styles.btn} ${styles[btnStatus1]}`}
            onClick={handleClick1}
          >
            All Submission
          </button>
          <button
            className={`${styles.btn} ${styles[btnStatus2]}`}
            onClick={handleClick2}
          >
            Reviwed Submission
          </button>
        </div>
        <div className={styles.table}>
          <Table />
        </div>
      </div>
    </div>
  );
}
