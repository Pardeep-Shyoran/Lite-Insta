import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Lite-Insta</h1>
      <p className={styles.license}>
        <a
          target="_blank"
          className={styles.getStarted}
          href="https://lite-insta.vercel.app"
          rel="noopener nopreferrer"
        >
          Get Started
        </a>
        <a
          href="https://opensource.org/licenses/ISC"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.shields.io/badge/License-ISC-blue.svg"
            alt="License: ISC"
          />
        </a>
      </p>
      <p className={styles.description}>
        <p className={styles.tagline}>Snap. Share. Explore.</p>
        <p className={styles.tagdescription}>
          Register, post, explore, and connect — powered by Node.js, AI, and a
          sleek React/Vite frontend.
        </p>
      </p>
    </header>
  );
};

export default Header;
