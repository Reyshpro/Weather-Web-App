import styles from "./WeatherCard.module.css";
import type { WeatherData } from "../../services/weatherService";
import type { CitySuggestion } from "../../services/cityService";

type WeatherCardProps = {
  weather: WeatherData;
  city: CitySuggestion;
};

const WeatherCard = ({ weather, city }: WeatherCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <div>
          <h3 className={styles.city}>
            {city.name}, {city.country}
          </h3>
          <p className={styles.condition}>
            {weather.description}
          </p>
        </div>

        <div className={styles.temp}>
          {Math.round(weather.temp)}°
        </div>
      </div>

      <div className={styles.details}>
        <div>
          <span>💨</span>
          <p>Wind</p>
          <strong>{weather.wind} m/s</strong>
        </div>

        <div>
          <span>🌧️</span>
          <p>Rain</p>
          <strong>{Math.round(weather.rainChance)}%</strong>
        </div>

        <div>
          <span>💧</span>
          <p>Humidity</p>
          <strong>{weather.humidity}%</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
