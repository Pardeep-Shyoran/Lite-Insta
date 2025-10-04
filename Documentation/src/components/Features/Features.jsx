import styles from './Features.module.css'

const Features = () => {
  return (
    <section id="features" className="section">
      <h2 className="heading">Features</h2>
      <ul className={styles.list}>
        <li><strong>User Authentication</strong>: Secure registration/login with JWT and password hashing</li>
        <li><strong>Post Management</strong>: Full CRUD operations for posts with image uploads</li>
        <li><strong>Profile Management</strong>: View and edit profiles with bio and pictures</li>
        <li><strong>Responsive UI</strong>: Mobile-friendly design</li>
        <li><strong>AI Features</strong>: Integration with Google GenAI for content suggestions</li>
        <li><strong>Notifications</strong>: Toast messages for user feedback</li>
        <li><strong>Protected Routes</strong>: Authenticated access to certain pages</li>
      </ul>
    </section>
  )
}

export default Features
