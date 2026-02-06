import SearchBar from "../SearchBar/SearchBar";
import WeatherCard from "../WeatherCard/WeatherCard";
import styles from "./WeatherScreen.module.css";
import { FiRefreshCw } from "react-icons/fi";
import OtherCities from "../OtherCities/OtherCities";
import WeatherTip from "../WeatherTip/WeatherTip";



type WeatherScreenProps = {
  userName: string;
  city: string;
};
  function capitalize(name: string) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  }


function WeatherScreen({ userName, city }: WeatherScreenProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Hi {capitalize(userName)} 👋</h2>
        <button className={styles.refreshBtn} aria-label="Refresh weather">
  <FiRefreshCw size={20} />
</button>

      </header>

      <SearchBar />

      <WeatherCard />

<section className={styles.hourly}>
  <h3 className={styles.hourlyTitle}>Next 24 hours</h3>

  <div className={styles.hourlyList}>
    <div className={styles.hour}>
      <p className={styles.time}>Now</p>
      <span>☁️</span>
      <p className={styles.temp}>22°</p>
    </div>

    <div className={styles.hour}>
      <p className={styles.time}>13:00</p>
      <span>🌤️</span>
      <p className={styles.temp}>23°</p>
    </div>

    <div className={styles.hour}>
      <p className={styles.time}>14:00</p>
      <span>☀️</span>
      <p className={styles.temp}>25°</p>
    </div>

    <div className={styles.hour}>
      <p className={styles.time}>15:00</p>
      <span>🌥️</span>
      <p className={styles.temp}>24°</p>
    </div>
  </div>
</section>
 <OtherCities />
 <WeatherTip />
    </div>
  );
}

export default WeatherScreen;
