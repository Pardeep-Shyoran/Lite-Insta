import styles from './ProjectStructure.module.css'

const ProjectStructure = () => {
  return (
    <section id="project-structure" className="section">
      <h2 className="heading">Project Structure</h2>
      <p className={styles.paragraph}>
        The project is organized into two main directories: <code>Backend</code> for the server-side API and <code>Frontend</code> for the client-side application. Below is a detailed overview of the key directories and files.
      </p>
      <ul className={styles.list}>
        <li><strong>Backend/</strong>: Backend API server (Node.js + Express)
          <ul>
            <li><strong>src/</strong>
              <ul>
                <li><strong>controllers/</strong>: API controllers for auth and posts</li>
                <li><strong>db/</strong>: Database connection</li>
                <li><strong>middlewares/</strong>: Authentication middleware</li>
                <li><strong>models/</strong>: Mongoose models for User and Post</li>
                <li><strong>routes/</strong>: API routes</li>
                <li><strong>services/</strong>: AI and storage services</li>
              </ul>
            </li>
            <li><strong>package.json</strong>: Backend dependencies and scripts</li>
            <li><strong>server.js</strong>: Entry point</li>
            <li><strong>.gitignore</strong>: Files to ignore in version control</li>
          </ul>
        </li>
        <li><strong>Frontend/</strong>: Frontend React app
          <ul>
            <li><strong>public/</strong>: Static assets</li>
            <li><strong>src/</strong>
              <ul>
                <li><strong>api/</strong>: Axios configuration</li>
                <li><strong>assets/</strong>: Images and icons</li>
                <li><strong>components/</strong>: Reusable UI components</li>
                <li><strong>features/</strong>: Redux slices and actions</li>
                <li><strong>pages/</strong>: Page components</li>
                <li><strong>routes/</strong>: Routing configuration</li>
                <li><strong>store/</strong>: Redux store</li>
              </ul>
            </li>
            <li><strong>package.json</strong>: Frontend dependencies and scripts</li>
            <li><strong>vite.config.js</strong>: Vite configuration</li>
            <li><strong>index.html</strong>: Main HTML template</li>
          </ul>
        </li>
        <li><strong>readme.md</strong>: This documentation file</li>
      </ul>
      <p className={styles.paragraph}><strong>Notes:</strong></p>
      <ul className={styles.list}>
        <li>Clickable links are provided for easy navigation to directories.</li>
        <li>Node modules and build outputs are omitted for clarity.</li>
        <li>The structure follows a modular approach for scalability.</li>
      </ul>
    </section>
  )
}

export default ProjectStructure
