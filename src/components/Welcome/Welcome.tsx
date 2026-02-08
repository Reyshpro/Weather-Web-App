import { useEffect, useState } from "react";
import { fetchCitySuggestions } from "../../services/cityService";
import type { CitySuggestion } from "../../services/cityService";

import styles from "./Welcome.module.css";

type WelcomeProps = {
  userName: string;
  city: string;
  onNameChange: (value: string) => void;
  onCityChange: (value: CitySuggestion) => void;
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
  const [cityInput, setCityInput] = useState(city);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!cityInput) {
        setSuggestions([]);
        return;
      }

      const results = await fetchCitySuggestions(cityInput);
      console.log("Results:", results);
      setSuggestions(results);
    }, 300);

    return () => clearTimeout(timeout);
  }, [cityInput]);

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
          value={cityInput}
          placeholder="Start typing a city..."
          onChange={(e) => {
            setCityInput(e.target.value);
            setShowDropdown(true);
          }}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 150);
          }}
        />

        {showDropdown && cityInput && (
          <ul className={styles.dropdown}>
            {suggestions.length > 0 ? (
              suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setCityInput(`${s.name}, ${s.country}`);
                    onCityChange(s); 
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
        disabled={!isNameValid || !cityInput}
      >
        See my weather →
      </button>
    </div>
  );
}

export default Welcome;
