import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/Auth/authActions";
import styles from "./Login.module.css";
import { useEffect } from "react";

const Login = () => {

  const {loading, success, error} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  function LoginHandler(user) {
    // console.log(user);
    dispatch(loginUser(user));
  }

  useEffect(() => {
    if(loading){
      console.log("Loading...");
    }
    if(success){
      navigate("/");
    }
  })

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