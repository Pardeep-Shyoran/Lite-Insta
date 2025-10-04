import styles from './Installation.module.css'

const Installation = () => {
  return (
    <section id="installation" className="section">
      <h2 className="heading">Installation</h2>
      <h3 className={styles.subheading}>Prerequisites</h3>
      <ul className={styles.list}>
        <li>Node.js (v16+)</li>
        <li>MongoDB (local or cloud instance)</li>
        <li>ImageKit account for image storage</li>
        <li>Google GenAI API key</li>
      </ul>
      <h3 className={styles.subheading}>Backend Setup</h3>
      <ol className={styles.orderedList}>
        <li>Navigate to Backend: <code>cd Backend</code></li>
        <li>Install dependencies: <code>npm install</code></li>
        <li>Create <code>.env</code> file with required variables:
          <ul className={styles.sublist}>
            <li><code>PORT=5000</code></li>
            <li><code>MONGODB_URI=your_mongodb_uri</code></li>
            <li><code>JWT_SECRET=your_jwt_secret</code></li>
            <li><code>IMAGEKIT_PUBLIC_KEY=your_public_key</code></li>
            <li><code>IMAGEKIT_PRIVATE_KEY=your_private_key</code></li>
            <li><code>IMAGEKIT_URL_ENDPOINT=your_endpoint</code></li>
            <li><code>GOOGLE_GENAI_API_KEY=your_api_key</code></li>
          </ul>
        </li>
        <li>Start server: <code>node server.js</code></li>
      </ol>
      <h3 className={styles.subheading}>Frontend Setup</h3>
      <ol className={styles.orderedList}>
        <li>Navigate to Frontend: <code>cd Frontend</code></li>
        <li>Install dependencies: <code>npm install</code></li>
        <li>Start dev server: <code>npm run dev</code></li>
        <li>Open browser at <code>http://localhost:5173</code></li>
      </ol>
    </section>
  )
}

export default Installation
