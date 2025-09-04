import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import styles from './PageNotFound.module.css'

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Lite-Insta</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.message}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
        </div>
        <Link className={styles.link} to="/">Go back to Home</Link>
      </div>
    </>
  )
}

export default PageNotFound