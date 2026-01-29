import styles from "./OtherCities.module.css";

const OtherCities = () => {
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Other cities</h3>

      <div className={styles.list}>
        <div className={styles.card}>
          <p className={styles.city}>Istanbul</p>
          <p className={styles.temp}>18°</p>
        </div>

        <div className={styles.card}>
          <p className={styles.city}>Ankara</p>
          <p className={styles.temp}>15°</p>
        </div>

        <div className={styles.card}>
          <p className={styles.city}>Izmir</p>
          <p className={styles.temp}>20°</p>
        </div>

        <div className={styles.card}>
          <p className={styles.city}>Antalya</p>
          <p className={styles.temp}>24°</p>
        </div>
      </div>
    </section>
  );
};

export default OtherCities;
