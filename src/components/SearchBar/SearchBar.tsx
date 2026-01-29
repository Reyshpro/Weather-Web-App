import { FiSearch } from "react-icons/fi";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search for a city..."
        className={styles.input}
      />
      <button className={styles.button} aria-label="Search">
        <FiSearch size={18} />
      </button>
    </div>
  );
};

export default SearchBar;
