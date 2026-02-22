import { useEffect, useState } from "react";
import styles from "./OtherCities.module.css";

import { fetchCitiesByCountry } from "../../services/geoService";
import { fetchWeather } from "../../services/weatherService";
import type { CitySuggestion } from "../../services/cityService";
import type { WeatherData } from "../../services/weatherService";

type OtherCitiesProps = {
  countryCode: string;
  currentCity: CitySuggestion;
};

type CityWeather = {
  city: string;
  weather: WeatherData;
};

const OtherCities = ({ countryCode, currentCity }: OtherCitiesProps) => {
  const [citiesWeather, setCitiesWeather] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  let cancelled = false;

  const loadCities = async () => {
    try {
      setLoading(true);

      const cities = await fetchCitiesByCountry(countryCode);

      const filtered = cities
        .filter((c) => c.name !== currentCity.name)
        .slice(0, 4);

      const results: CityWeather[] = [];

      for (const c of filtered) {
        const weather = await fetchWeather(c.latitude, c.longitude);

        results.push({
          city: c.name,
          weather,
        });

        
        await new Promise(res => setTimeout(res, 300));
      }

      if (!cancelled) {
        setCitiesWeather(results);
      }

    } catch (err) {
      console.error("OtherCities error:", err);
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  loadCities();

  return () => {
    cancelled = true;
  };

}, [countryCode, currentCity.name]);

  if (loading) return <p>Loading other cities...</p>;

  if (!loading && citiesWeather.length === 0)
    return <p>Other cities unavailable (API limit reached)</p>;

  return (
    <section className={styles.container}>
      <h3>Other cities</h3>

      <div className={styles.list}>
        {citiesWeather.map((c, i) => (
          <div key={i} className={styles.card}>
            <p className={styles.city}>{c.city}</p>
            <p>{Math.round(c.weather.temp)}°</p>
            <p>{c.weather.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OtherCities;
