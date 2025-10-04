import styles from './License.module.css'

const License = () => {
  return (
    <section id="license" className="section">
      <h2 className="heading">License</h2>
      <p className={styles.paragraph}>Licensed under <a href="https://opensource.org/licenses/ISC" target="_blank" rel="noopener noreferrer">ISC License</a>.</p>
    </section>
  )
}

export default License
