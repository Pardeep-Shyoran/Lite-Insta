import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <h2 className={styles.heading}>Table of Contents</h2>
      <ul className={styles.list}>
        <li><a href="#project-overview">Project Overview</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#scripts">Scripts</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#api-endpoints-overview">API Endpoints Overview</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#future-enhancements">Future Enhancements</a></li>
        <li><a href="#acknowledgments">Acknowledgments</a></li>
        <li><a href="#license">License</a></li>
      </ul>
    </nav>
  )
}

export default NavBar
