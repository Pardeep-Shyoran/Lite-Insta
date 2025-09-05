import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"
import styles from "./Register.module.css";

const Register = () => {

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { register, reset, handleSubmit,} = useForm();

  function RegisterHandler(data) {
    console.log(data);
    // Implement registration logic here, e.g., send data to backend
    toast.success("Registered successfully!");
    reset();
    navigate("/login");
  }

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

          {/* <div>
            <label>Full Name: </label>
            <input type="text" />
          </div>

          <div>
            <label>Email: </label>
            <input type="email" />
          </div> */}

          <div>
            <label>Username: </label>
            <input type="text" {...register('username')} />
          </div>

          <div>
            <label>Password: </label>
            <input type="password" {...register('password')} />
          </div>

          <button type="submit">Register</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>

        </form>
      </div>
    </>
  )
}

export default Register