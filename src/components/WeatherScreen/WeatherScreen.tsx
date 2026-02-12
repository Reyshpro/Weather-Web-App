import SearchBar from "../SearchBar/SearchBar";
import WeatherCard from "../WeatherCard/WeatherCard";
import styles from "./WeatherScreen.module.css";
import { FiRefreshCw } from "react-icons/fi";
import OtherCities from "../OtherCities/OtherCities";
import WeatherTip from "../WeatherTip/WeatherTip";
import { useEffect, useState } from "react";
import { fetchWeather } from "../../services/weatherService";
import type { WeatherData } from "../../services/weatherService";
import type { CitySuggestion } from "../../services/cityService";


type WeatherScreenProps = {
  userName: string;
  city: CitySuggestion;
};

function capitalize(name: string) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function WeatherScreen({ userName, city }: WeatherScreenProps) {
  const [selectedCity, setSelectedCity] = useState(city);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError(null);

     const data = await fetchWeather(selectedCity.lat, selectedCity.lon);

      setWeather(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load weather");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    loadWeather();
  }, [selectedCity]);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Hi {capitalize(userName)} 👋</h2>

        <button
          className={styles.refreshBtn}
          aria-label="Refresh weather"
          onClick={loadWeather}
        >
          <FiRefreshCw size={20} />
        </button>
      </header>

      <SearchBar onCitySelect={setSelectedCity} />


      {loading ? (
        <p>Loading weather...</p>
      ) : error ? (
        <p>{error}</p>
      ) : weather ? (
     <WeatherCard weather={weather} city={selectedCity} />
      ) : null}

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
     {weather && <WeatherTip weather={weather} />}
    </div>
  );
}

export default WeatherScreen;
