import React from "react";
import { useState } from "react";
import styles from "./test.module.css";
import Card from "../../components/Card.jsx";
import Table from "../../components/Table.jsx";

//this is just test file

export default function HomeAdmin() {
  // changes button status and highlights the active button
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
        <div className={styles.card_header}>
          <h2>Total Submissions: 123</h2>
        </div>
        <div className={styles.options_container}>
          <div className={styles.searchbar}>
            <input type="text" placeholder="Search" />
          </div>
          <div className={styles.btn_container}>
            <button className={`${styles.btn} ${styles.filter}`}>Filter</button>
            <button className={`${styles.btn} ${styles.search}`}>Search</button>
            <button className={`${styles.btn} ${styles.clear}`}>Clear</button>
          </div>
        </div>

        <div className={styles.table}>
          <Table />
        </div>
      </div>
    </div>
  );
}
