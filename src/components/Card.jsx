import styles from "./card.module.css";

export default function Card({ Number, Subtitle, TextColor }) {
  return (
    <div className={styles.container}>
      <label className={styles.number} style={{ color: TextColor }}>
        {Number}
      </label>
      <label className={styles.subtitle}>{Subtitle}</label>
    </div>
  );
}
