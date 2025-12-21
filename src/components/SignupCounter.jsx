import React from "react";
import { useState } from "react";
import styles from "./SignupCounter.module.css";

export default function SignupCounter({ stepNo }) {
  const [shaded, setShaded] = React.useState("");
  const circleColor = (stepNo, num) => {
    if (stepNo >= num) {
      return styles.circleShaded;
    } else {
      return styles.circle;
    }
  };

  return (
    <div className={styles.numbersContainer}>
      <div className={styles.circleContainer}>
        <div className={circleColor(stepNo, 1)}>
          <p>1</p>
        </div>
        <p>Verify Email</p>
      </div>
      <div className={styles.circleContainer}>
        <div className={circleColor(stepNo, 2)}>
          <p>2</p>
        </div>
        <p>Create password</p>
      </div>
      <div className={styles.circleContainer}>
        <div className={circleColor(stepNo, 3)}>
          <p>3</p>
        </div>
        <p>Done</p>
      </div>
    </div>
  );
}
