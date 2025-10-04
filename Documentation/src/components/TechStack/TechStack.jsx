import styles from './TechStack.module.css'

const TechStack = () => {
  return (
    <section id="tech-stack" className="section">
      <h2 className="heading">Tech Stack</h2>
      <h3 className={styles.subheading}>Backend</h3>
      <ul className={styles.list}>
        <li>Node.js & Express</li>
        <li>MongoDB (Mongoose)</li>
        <li>JWT, Multer, ImageKit</li>
        <li>Google GenAI, CORS</li>
      </ul>
      <h3 className={styles.subheading}>Frontend</h3>
      <ul className={styles.list}>
        <li>React 18 & Vite</li>
        <li>Redux Toolkit, React Router</li>
        <li>Axios, React Hook Form</li>
        <li>React Toastify, ESLint</li>
      </ul>
    </section>
  )
}

export default TechStack
