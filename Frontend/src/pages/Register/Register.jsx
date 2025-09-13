import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { nanoid } from "@reduxjs/toolkit";
import { registerUser } from "../../features/Auth/authActions";
import styles from "./Register.module.css";

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success, userInfo, message } = useSelector(
    (state) => state.authReducer
  );

  const { register, handleSubmit } = useForm();

  function RegisterHandler(user) {
    if(user.password !== user.confirmPassword){
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
        <meta name="description" content="Create a new account on Lite-Insta." />
      </Helmet>
      <div>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit(RegisterHandler)} method="POST" encType="multipart/form-data">
          <div>
            <label>Choose Profile Pic: </label>
            <input type="file" {...register('profilePic')} />
          </div>

          <div>
            <label>Full Name: </label>
            <input type="text" {...register('fullName')} />
          </div>

          <div>
            <label>Email: </label>
            <input type="email" {...register('email')} />
          </div>

          <div>
            <label>Username: </label>
            <input type="text" {...register('username')} />
          </div>

          <div>
            <label>Password: </label>
            <input type="password" {...register('password')} />
          </div>

          <div>
            <label>Confirm Password: </label>
            <input type="password" {...register('confirmPassword')} />
          </div>

          <button type="submit">Register</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>

        </form>
      </div>
    </>
  )
}

export default Register