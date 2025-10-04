import styles from './Contributing.module.css'

const Contributing = () => {
  return (
    <section id="contributing" className="section">
      <h2 className="heading">Contributing</h2>
      <p className={styles.paragraph}>Contributions welcome! Follow these steps:</p>
      <ol className={styles.orderedList}>
        <li>Fork the repo</li>
        <li>Create feature branch: <code>git checkout -b feature/your-feature</code></li>
        <li>Make changes & run <code>npm run lint</code></li>
        <li>Commit: <code>git commit -m 'Add feature'</code></li>
        <li>Push & open PR</li>
      </ol>
      <p className="paragraph">Ensure code is documented and styled consistently.</p>
    </section>
  )
}

export default Contributing
