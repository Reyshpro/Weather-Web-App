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
    const loadCities = async () => {
      try {
        setLoading(true);

        const cities = await fetchCitiesByCountry(countryCode);

       
        const filtered = cities.filter(
          (c: any) => c.city !== currentCity.name
        );

        // Fetch weather for each city
        const weatherPromises = filtered.slice(0, 4).map(async (c: any) => {
          const weather = await fetchWeather(c.latitude, c.longitude);

          return {
            city: c.city || c.name,
            weather,
          };
        });

        const results = await Promise.all(weatherPromises);

        setCitiesWeather(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, [countryCode, currentCity]);

  if (loading) return <p>Loading other cities...</p>;

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
