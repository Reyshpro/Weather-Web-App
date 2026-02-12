import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { fetchCitySuggestions } from "../../services/cityService";
import type { CitySuggestion } from "../../services/cityService";

import styles from "./SearchBar.module.css";

type SearchBarProps = {
  onCitySelect: (city: CitySuggestion) => void;
};

const SearchBar = ({ onCitySelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState<CitySuggestion | null>(null);

 
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query) {
        setSuggestions([]);
        return;
      }

      const results = await fetchCitySuggestions(query);
      setSuggestions(results);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);
const handleSearch = () => {
  if (selected) {
    onCitySelect(selected);

    setQuery("");
    setSelected(null);
    setSuggestions([]);
    setShowDropdown(false);
  }
};



  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}

        placeholder="Search for a city..."
        value={query}
        className={styles.input}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onBlur={() => {
          setTimeout(() => setShowDropdown(false), 150);
        }}
      />

      <button
      className={styles.button}
      aria-label="Search"
      onClick={handleSearch}
      >

        <FiSearch size={18} />
      </button>

      {showDropdown && query && (
        <ul className={styles.dropdown}>
          {suggestions.length > 0 ? (
            suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => {
                  setQuery(`${s.name}, ${s.country}`);
                  setSelected(s);
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
  );
};

export default SearchBar;
