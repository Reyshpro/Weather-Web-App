import styles from "./WeatherCard.module.css";

const WeatherCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <div>
          <h3 className={styles.city}>Gaziantep</h3>
          <p className={styles.condition}>Partly Cloudy</p>
        </div>

        <div className={styles.temp}>22°</div>
      </div>

      <div className={styles.details}>
        <div>
          <span>💨</span>
          <p>Wind</p>
          <strong>12 km/h</strong>
        </div>

        <div>
          <span>🌧️</span>
          <p>Rain</p>
          <strong>20%</strong>
        </div>

        <div>
          <span>💧</span>
          <p>Humidity</p>
          <strong>60%</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
