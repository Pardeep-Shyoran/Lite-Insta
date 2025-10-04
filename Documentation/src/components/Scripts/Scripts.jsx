import styles from './Scripts.module.css'

const Scripts = () => {
  return (
    <section id="scripts" className="section">
      <h2 className="heading">Scripts</h2>
      <h3 className={styles.subheading}>Backend</h3>
      <ul className={styles.list}>
        <li><code>node server.js</code> - Start production server</li>
      </ul>
      <h3 className={styles.subheading}>Frontend</h3>
      <ul className={styles.list}>
        <li><code>npm run dev</code> - Start development server</li>
        <li><code>npm run build</code> - Build for production</li>
        <li><code>npm run preview</code> - Preview production build</li>
        <li><code>npm run lint</code> - Run ESLint</li>
      </ul>
    </section>
  )
}

export default Scripts
