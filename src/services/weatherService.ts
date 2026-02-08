export type WeatherData = {
  temp: number;
  description: string;
  wind: number;
  rainChance: number;
  humidity: number;
};

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await res.json();

  return {
    temp: data.main.temp,
    description: data.weather[0].description,
    wind: data.wind.speed,
    rainChance: 0, 
    humidity: data.main.humidity,
  };
}
