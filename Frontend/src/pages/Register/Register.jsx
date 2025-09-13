import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
      toast.error(error);
    }
    if (success) {
      // console.log(userInfo);
      // console.log(message);
      toast.success(message || "Registration successful!");
      navigate("/");
    }
  }, [success, navigate, loading, userInfo, message, error]);

  return (
    <>
      <Helmet>
        <title>Register - Lite-Insta</title>
        <meta
          name="description"
          content="Create a new account on Lite-Insta."
        />
      </Helmet>
      <div>
        <h1>Register Page</h1>
        <form
          onSubmit={handleSubmit(RegisterHandler)}
          method="POST"
          encType="multipart/form-data"
        >
          <div>
            <label>Choose Profile Pic: </label>
            <input type="file" {...register("profilePic")} />
          </div>

          <div>
            <label>Full Name: </label>
            <input
              {...register("fullName", {
                required: { value: true, message: "Full Name is required." },
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
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </div>

          <div>
            <label>Email: </label>
            <input
              {...register("email", {
                required: { value: true, message: "Email is required." },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              type="email"
              placeholder="user@mail.com"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label>Username: </label>
            <input
              {...register("username", {
                required: { value: true, message: "Username is required." },
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
                  message: "Username can only contain letters, numbers, and underscores.",
                },
              })}
              type="text"
              placeholder="username18"
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <div>
            <label>Password: </label>
            <input
              {...register("password", {
                required: { value: true, message: "Password is required." },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Password must be at most 20 characters.",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                },
              })}
              type="password"
              placeholder="********"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <label>Confirm Password: </label>
            <input
              {...register("confirmPassword", {
                required: { value: true, message: "Please confirm your password." },
                validate: (value) =>
                  value === watch("password") || "Passwords do not match.",
              })}
              type="password"
              placeholder="********"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Registering..." : "Register"}</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
