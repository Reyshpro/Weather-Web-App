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
import { fetchCitiesByCountry } from "../../services/geoService";


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
  const [otherCities, setOtherCities] = useState<any[]>([]);
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

useEffect(() => {
  const loadOtherCities = async () => {
    try {
      const cities = await fetchCitiesByCountry(selectedCity.countryCode || selectedCity.country);

      const weatherData = await Promise.all(
        cities
          .filter(c => c.name !== selectedCity.name)
          .map(async (c) => {
            const weather = await fetchWeather(c.latitude, c.longitude);
            return { ...c, weather };
          })
      );

      setOtherCities(weatherData);
    } catch (err) {
      console.error(err);
    }
  };

  loadOtherCities();
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
    {weather?.hourly.map((hour, i) => (
      <div key={i} className={styles.hour}>
        <p className={styles.time}>{hour.time}</p>
        <span>🌤️</span>
        <p className={styles.temp}>{hour.temp}°</p>
      </div>
    ))}
  </div>
</section>


      <OtherCities
  countryCode={selectedCity.country}
  currentCity={selectedCity}
/>

     {weather && <WeatherTip weather={weather} />}
    </div>
  );
}

export default WeatherScreen;
