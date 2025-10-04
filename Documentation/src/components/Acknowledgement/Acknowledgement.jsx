import styles from './Acknowledgement.module.css'

const Acknowledgement = () => {
  return (
    <section id="acknowledgments" className="section">
      <h2 className="heading">Acknowledgments</h2>
      <ul className={styles.list}>
        <li>Inspired by Instagram</li>
        <li>Built with open-source tools</li>
      </ul>
    </section>
  )
}

export default Acknowledgement
