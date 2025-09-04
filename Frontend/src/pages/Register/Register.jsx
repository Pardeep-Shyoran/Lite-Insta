import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"
import styles from "./Register.module.css";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register - Lite-Insta</title>
        <meta name="description" content="Create a new account on Lite-Insta." />
      </Helmet>
      <div>
        <h1>Register Page</h1>

      </div>
    </>
  )
}

export default Register