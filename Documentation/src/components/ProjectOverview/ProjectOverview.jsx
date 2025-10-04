import styles from './ProjectOverview.module.css'

const ProjectOverview = () => {
  return (
    <section id="project-overview" className="section">
      <h2 className="heading">Project Overview</h2>
      <p className={styles.paragraph}>
        Lite-Insta aims to provide a simplified version of a social media platform where users can share photos and connect with others. Key functionalities include:
      </p>
      <ul className={styles.list}>
        <li>User authentication and profile management</li>
        <li>Post creation, viewing, updating, and deletion with image uploads</li>
        <li>Responsive design for mobile and desktop</li>
        <li>AI-powered features for content generation</li>
      </ul>
      <p className={styles.paragraph}>
        The application uses modern web technologies for scalability and security. It's ideal for learning full-stack development and can be extended with features like comments, likes, and messaging.
      </p>
    </section>
  )
}

export default ProjectOverview
