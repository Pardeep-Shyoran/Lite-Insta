import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.liteinstaLoader}>
      <div className={styles.spinner} />
      <div className={styles.loaderText}>Loading...</div>
    </div>
  );
}
