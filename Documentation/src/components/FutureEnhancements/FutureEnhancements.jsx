import styles from './FutureEnhancements.module.css'

const FutureEnhancements = () => {
  return (
    <section id="future-enhancements" className="section">
      <h2 className="heading">Future Enhancements</h2>
      <ul className={styles.list}>
        <li>Comments & likes on posts</li>
        <li>Direct messaging</li>
        <li>Search for users/posts</li>
        <li>Advanced AI features (e.g., auto-tagging)</li>
        <li>Push notifications</li>
        <li>Dark mode toggle</li>
      </ul>
    </section>
  )
}

export default FutureEnhancements
