import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { nanoid } from "@reduxjs/toolkit";
import { registerUser } from "../../features/Auth/authActions";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success, userInfo, message } = useSelector(
    (state) => state.authReducer
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  function RegisterHandler(user) {
    if (user.password !== user.confirmPassword) {
      toast.warn("Please check your password and confirm password fields.");
      return;
    }
    user.email = user.email.toLowerCase();

    user.id = nanoid();

    // console.log(user);
    dispatch(registerUser(user));
  }

  useEffect(() => {
    if (loading) {
      toast.info(message || "Registering ...");
    }
    if (error) {
      toast.error(error || "Something went wrong");
    }
    if (success) {
      toast.success(message || "Registration successful!");
      reset();
      navigate("/");
    }
  }, [success, navigate, loading, message, error]);

  return (
    <>
      <Helmet>
        <title>Register - Lite-Insta</title>
        <meta
          name="description"
          content="Create a new account on Lite-Insta."
        />
      </Helmet>

      <div className={styles["register-container"]}>
        {/* Left section */}
        <div className={styles["register-leftSection"]}>
          <h2>Welcome!</h2>
          <p>Create Account to start your journey with Lite-Insta</p>
        </div>

        {/* Right section with form */}
        <div className={styles["register-rightSection"]}>
          <div className={styles["register-formBox"]}>
            <h1>Create An Account</h1>

            <form
              onSubmit={handleSubmit(RegisterHandler)}
              method="POST"
              encType="multipart/form-data"
            >
              <div className={styles["register-formGroup"]}>
                <label className={styles["register-label"]}>
                  Choose Profile Pic:
                </label>
                <input
                  type="file"
                  className={styles["register-input"]}
                  {...register("profilePic")}
                />
              </div>

              <div className={styles["register-formGroup"]}>
                <label className={styles["register-label"]}>Full Name:</label>
                <input
                  {...register("fullName", {
                    required: "Full Name is required.",
                    minLength: {
                      value: 3,
                      message: "Full Name must be at least 3 characters.",
                    },
                    maxLength: {
                      value: 25,
                      message: "Full Name must be at most 25 characters.",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Full Name can only contain letters and spaces.",
                    },
                  })}
                  type="text"
                  placeholder="John Doe"
                  className={styles["register-input"]}
                />
                {errors.fullName && (
                  <p className={styles["register-error"]}>
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className={styles["register-formGroup"]}>
                <label className={styles["register-label"]}>Email:</label>
                <input
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  type="email"
                  placeholder="user@mail.com"
                  className={styles["register-input"]}
                />
                {errors.email && (
                  <p className={styles["register-error"]}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className={styles["register-formGroup"]}>
                <label className={styles["register-label"]}>Username:</label>
                <input
                  {...register("username", {
                    required: "Username is required.",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters.",
                    },
                    maxLength: {
                      value: 15,
                      message: "Username must be at most 15 characters.",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers, and underscores.",
                    },
                  })}
                  type="text"
                  placeholder="username18"
                  className={styles["register-input"]}
                />
                {errors.username && (
                  <p className={styles["register-error"]}>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className={styles["register-formGroup"]}>
                <label className={styles["register-label"]}>Password:</label>
                <input
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters.",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be at most 20 characters.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain uppercase, lowercase, number, and special character.",
                    },
                  })}
                  type="password"
                  placeholder="********"
                  className={styles["register-input"]}
                />
                {errors.password && (
                  <p className={styles["register-error"]}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className={styles["register-formGroup"]}>
                <label className={styles["register-label"]}>
                  Confirm Password:
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password.",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match.",
                  })}
                  type="password"
                  placeholder="********"
                  className={styles["register-input"]}
                />
                {errors.confirmPassword && (
                  <p className={styles["register-error"]}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={styles["register-button"]}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>

              <p className={styles["register-extraText"]}>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
