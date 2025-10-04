import styles from './Usage.module.css'

const Usage = () => {
  return (
    <section id="usage" className="section">
      <h2 className="heading">Usage</h2>
      <ol className={styles.orderedList}>
        <li><strong>Register/Login</strong> with credentials</li>
        <li><strong>Create Posts</strong> with images</li>
        <li><strong>Edit Profile</strong> and view others</li>
        <li><strong>Browse & Interact</strong> with posts</li>
      </ol>
    </section>
  )
}

export default Usage
