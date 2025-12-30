import styles from "./modules/circle.module.css";

export default function Circle({ CurrentStep, StepNo, Subtitle }) {
  // decides the circle color based on current step
  const circleColor = () => {
    return CurrentStep >= StepNo ? styles.circleShaded : styles.circle;
  };
  return (
    <div className={styles.circleContainer}>
      <div className={circleColor()}>
        <p>{StepNo}</p>
      </div>
      <p>{Subtitle}</p>
    </div>
  );
}
