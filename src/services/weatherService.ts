export type HourlyForecast = {
  time: string;
  temp: number;
  description: string;
};

export type WeatherData = {
  temp: number;
  description: string;
  wind: number;
  humidity: number;
  hourly: HourlyForecast[];
};

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  //  fetch current weather
  const currentRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!currentRes.ok) {
    throw new Error("Failed to fetch current weather");
  }

  const current = await currentRes.json();

  //  fetch forecast
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!forecastRes.ok) {
    throw new Error("Failed to fetch forecast");
  }

  const forecast = await forecastRes.json();

  const hourly = forecast.list.slice(0, 8).map((item: any) => ({
    time: item.dt_txt.slice(11, 16), 
    temp: item.main.temp,
    description: item.weather[0].description,
  }));

  return {
    temp: current.main.temp,
    description: current.weather[0].description,
    wind: current.wind.speed,
    humidity: current.main.humidity,
    hourly,
  };
}
