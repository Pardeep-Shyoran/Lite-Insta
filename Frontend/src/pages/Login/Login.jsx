import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {

  const { register, reset, handleSubmit } = useForm();

  function LoginHandler(data) {
    console.log(data);
    reset();
  }

  return (
    <>
      <Helmet>
        <title>Login - Lite-Insta</title>
        <meta name="description" content="Login to Lite-Insta to access your account." />
      </Helmet>
      <div>
        <div>
          <h1>Login Page</h1>
          <form onSubmit={handleSubmit(LoginHandler)} method="POST">
            <div>
              <label>Username: </label>
              <input type="text" {...register('username')} />
            </div>

            <div>
              <label>Password: </label>
              <input type="password" {...register('password')} />
            </div>

            <button type="submit">Login</button>
            <p>Don't have an Account? <Link to="/register">Register</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login