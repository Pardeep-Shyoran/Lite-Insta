import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/Auth/authActions";
import styles from "./Login.module.css";
import { useEffect } from "react";
import {toast} from "react-toastify"

const Login = () => {

  // note: only pull the fields used by this component to avoid unused var lint errors
  const { error } = useSelector((state) => state.authReducer || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    reset,
  formState: { isSubmitting } 
  } = 
   useForm();

   async function LoginHandler(user) {
    const toastId = toast.loading("Logging in...");
    try {
      const payload = await dispatch(loginUser(user)).unwrap();
      toast.update(toastId, {
        render: payload?.message || "Login Successful",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/profile");
    } catch (err) {
      toast.update(toastId, {
        render: err || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error); // handles any unexpected errors from Redux
    }
    reset();
  }, [error, reset]);

  return (

    <>
      <Helmet>
        <title>Login - Lite-Insta</title>
        <meta
          name="description"
          content="Login to Lite-Insta to access your account."
        />
      </Helmet>

      <div className={styles["login-container"]}>
        {/* Left Section */}
        <div className={styles["login-leftSection"]}>
          <h2>Welcome Back!</h2>
          <p>Sign in to continue your journey with Lite-Insta</p>
        </div>

        {/* Right Section */}
        <div className={styles["login-rightSection"]}>
          <div className={styles["login-formBox"]}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(LoginHandler)} method="POST">
              <div className={styles["login-formGroup"]}>
                <label className={styles["login-label"]}>Username:</label>
                <input
                  type="text"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  className={styles["login-input"]}
                  placeholder="Enter your username"
                />
              </div>

              <div className={styles["login-formGroup"]}>
                <label className={styles["login-label"]}>Password:</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={styles["login-input"]}
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                className={styles["login-button"]}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className={styles["login-extraText"]}>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login