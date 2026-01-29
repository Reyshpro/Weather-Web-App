import styles from "./WeatherTip.module.css";

const WeatherTip = () => {
  return (
    <div className={styles.tip}>
      <p className={styles.text}>
        🌤️ Great weather for a walk today!
      </p>
    </div>
  );
};

export default WeatherTip;
