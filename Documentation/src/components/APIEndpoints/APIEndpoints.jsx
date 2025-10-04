import styles from './APIEndpoints.module.css'

const APIEndpoints = () => {
  return (
    <section id="api-endpoints-overview" className="section">
      <h2 className="heading">API Endpoints Overview</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>POST</td>
            <td><code>/api/auth/register</code></td>
            <td>Register user</td>
          </tr>
          <tr>
            <td>POST</td>
            <td><code>/api/auth/login</code></td>
            <td>Login user</td>
          </tr>
          <tr>
            <td>GET</td>
            <td><code>/api/auth/logout</code></td>
            <td>Logout user</td>
          </tr>
          <tr>
            <td>GET</td>
            <td><code>/api/posts</code></td>
            <td>Get all posts</td>
          </tr>
          <tr>
            <td>POST</td>
            <td><code>/api/posts</code></td>
            <td>Create post</td>
          </tr>
          <tr>
            <td>GET</td>
            <td><code>/api/posts/:id</code></td>
            <td>Get post details</td>
          </tr>
          <tr>
            <td>PUT</td>
            <td><code>/api/posts/:id</code></td>
            <td>Update post</td>
          </tr>
          <tr>
            <td>DELETE</td>
            <td><code>/api/posts/:id</code></td>
            <td>Delete post</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default APIEndpoints
