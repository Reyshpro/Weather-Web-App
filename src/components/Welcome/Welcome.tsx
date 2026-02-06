import { useEffect, useState } from "react";
import { fetchCitySuggestions } from "../../services/cityService";
import type { CitySuggestion } from "../../services/cityService";

import styles from "./Welcome.module.css";

type WelcomeProps = {
  userName: string;
  city: string;
  onNameChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onContinue: () => void;
  isNameValid: boolean;
};

function Welcome({
  userName,
  city,
  onNameChange,
  onCityChange,
  onContinue,
  isNameValid,
}: WelcomeProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  useEffect(() => {
  const timeout = setTimeout(async () => {
    if (!city) {
      setSuggestions([]);
      return;
    }

  const results = await fetchCitySuggestions(city);
  console.log("Results:", results);
  setSuggestions(results);

  }, 300);

  return () => clearTimeout(timeout);
}, [city]);



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SkyBuddy 🌤️</h1>

      <div className={styles.field}>
        <label>What should we call you?</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className={styles.field}>
        <label>Which city are you in?</label>

        <input
          type="text"
          value={city}
          placeholder="Start typing a city..."
          onChange={(e) => {
            onCityChange(e.target.value);
            setShowDropdown(true);
          }}
          onBlur={() => {
           
            setTimeout(() => setShowDropdown(false), 150);
          }}
        />

    {showDropdown && city && (
  <ul className={styles.dropdown}>
    {suggestions.length > 0 ? (
      suggestions.map((s, i) => (
        <li
          key={i}
          onClick={() => {
            onCityChange(`${s.name}, ${s.country}`);
            setShowDropdown(false);
          }}
        >
          {s.name}, {s.country}
        </li>
      ))
    ) : (
      <li className={styles.noResult}>No city found</li>
    )}
  </ul>
)}


      </div>

      <button
        className={styles.button}
        onClick={onContinue}
         disabled={!isNameValid || !city}
      >
        See my weather →
      </button>
    </div>
  );
}

export default Welcome;
