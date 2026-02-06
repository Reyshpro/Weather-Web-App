export type CitySuggestion = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function fetchCitySuggestions(query: string) {
  if (!query) return [];

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );

  const data = await res.json();

  return data.map((city: any) => ({
    name: city.name,
    country: city.country,
    lat: city.lat,
    lon: city.lon,
  }));
}
