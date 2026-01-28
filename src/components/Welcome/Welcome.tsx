type WelcomeProps = {
  userName: string;
  city: string;
  onNameChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onContinue: () => void;
};

import styles from "./Welcome.module.css";

function Welcome({
  userName,
  city,
  onNameChange,
  onCityChange,
  onContinue,
}: WelcomeProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SkyBuddy 🌤️ </h1>

      <p className={styles.subtitle}>Ready to see what the sky has planned? ☁️</p>

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
          onChange={(e) => onCityChange(e.target.value)}
          placeholder="City name"
        />
      </div>

      <button
        className={styles.button}
        onClick={onContinue}
        disabled={!userName || !city}
      >
        See my weather →
      </button>
    </div>
  );
}

export default Welcome;
