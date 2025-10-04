import styles from './Architecture.module.css'

const Architecture = () => {
  return (
    <section id="architecture" className="section">
      <h2 className="heading">Architecture</h2>
      <p className={styles.paragraph}>The application follows a client-server architecture:</p>
      <h3 className={styles.subheading}>Backend</h3>
      <ul className={styles.list}>
        <li><strong>RESTful API</strong> built with Express.js</li>
        <li><strong>Database</strong>: MongoDB with Mongoose for data persistence</li>
        <li><strong>Authentication</strong>: JWT tokens for secure access</li>
        <li><strong>File Handling</strong>: Multer for uploads, ImageKit for storage</li>
        <li><strong>AI Integration</strong>: Google GenAI for content features</li>
      </ul>
      <h3 className={styles.subheading}>Frontend</h3>
      <ul className={styles.list}>
        <li><strong>SPA</strong> using React 18 with Vite for fast development</li>
        <li><strong>State Management</strong>: Redux Toolkit</li>
        <li><strong>Routing</strong>: React Router DOM</li>
        <li><strong>API Calls</strong>: Axios with configured base URL</li>
        <li><strong>Styling</strong>: CSS modules for scoped styles</li>
        <li><strong>Forms</strong>: React Hook Form for efficient handling</li>
      </ul>
      <p className={styles.paragraph}>Communication is via HTTP requests with CORS enabled.</p>
    </section>
  )
}

export default Architecture
