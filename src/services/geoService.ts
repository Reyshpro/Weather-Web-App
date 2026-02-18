export type GeoCity = {
  name: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

const API_KEY = import.meta.env.VITE_GEODB_API_KEY;

export async function fetchCitiesByCountry(countryCode: string): Promise<GeoCity[]> {
  const res = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${countryCode}&minPopulation=100000&sort=-population&limit=5`,
    {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cities");
  }

  const data = await res.json();

  return data.data.map((city: any) => ({
    name: city.city || city.name,
    countryCode: city.countryCode,
    latitude: city.latitude,
    longitude: city.longitude,
  }));
}
