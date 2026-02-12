import styles from "./WeatherTip.module.css";
import type { WeatherData } from "../../services/weatherService";

type WeatherTipProps = {
  weather: WeatherData;
};

function getWeatherTip(weather: WeatherData) {
  const { temp, description, rainChance } = weather;

  if (rainChance > 60) {
    return "🌧️ Take an umbrella — rain is likely today!";
  }

  if (temp >= 28) {
    return "☀️ It's hot outside — stay hydrated!";
  }

  if (temp <= 5) {
    return "🧥 Bundle up — it's pretty cold today!";
  }

  if (description.toLowerCase().includes("cloud")) {
    return "🌤️ Nice weather for a walk today!";
  }

  if (description.toLowerCase().includes("clear")) {
    return "😎 Perfect sunny day — enjoy it!";
  }

  return "🌈 Have a great day out there!";
}

const WeatherTip = ({ weather }: WeatherTipProps) => {
  return (
    <div className={styles.tip}>
      {getWeatherTip(weather)}
    </div>
  );
};

export default WeatherTip;
