import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

import FormImage from "../assets/images/HeroImage.jpg";
import { authActions } from "../slices/authSlice";
import "../styles/Login.css";
import { toDoActions } from "../slices/toDoSlice";
import { toast } from "react-toastify";

// Initial Formik Setup
const initialValues = {
  username: "",
  password: "",
};

// Validation Schema for formik login form
const loginSchema = Yup.object({
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .lowercase("Username must be in lowercase")
    .strict()
    .required("Required!"),
  password: Yup.string()
    .min(6, "Min Length: 8 characters")
    .max(64, "Max Length: 64 characters")
    .required("Password Required"),
});

function Login() {
  const dispatch = useDispatch(); // For dispatching the actions

  const [loginData, setLoginData] = useState(initialValues);

  // Auto-Subscribing to the authentication and users state from todo and auth slice.
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const users = useSelector((state) => state.auth.users);

  /**
   * Handle Login & Authorization.
   * @summary It will check if the user is registered in the localStorage and if found it will load user and load user's data. .
   * @param {values} values - The login values retrieved from the formik form.
   * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
   */
  const handleLogin = (values, { setSubmitting }) => {
    setSubmitting(false);
    const hash = users.map((e) => [e.username, e.password, e.toDos]);
    for (let key of hash) {
      if (key[0] === values.username && key[1] === values.password) {
        dispatch(
          authActions.loginUser({
            username: key[0],
            password: key[1],
            toDos: key[2],
          })
        );
        dispatch(
          authActions.loadUser({
            username: key[0],
            password: key[1],
            toDos: key[2],
          })
        );
        dispatch(
          toDoActions.loadToDos({
            username: key[0],
            password: key[1],
            toDos: key[2] || [],
          })
        );
        return toast.success("Logged in successfully");
      }
    }

    toast.error("Invalid Credentials");
  };

  // If logged in will redirect to Dashboard
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img src={FormImage} alt="Login Form" />
      </div>
      <div className="form-section">
        <Formik
          initialValues={loginData}
          validationSchema={loginSchema}
          enableReinitialize={true}
          onSubmit={handleLogin}
        >
          <Form className="form-fields">
            <div className="form-heading">Log In</div>
            <div className="form-field">
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="username"
              />
            </div>
            <div className="form-field">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="password"
              />
            </div>

            <button type="submit" className="auth-button">
              Log In
            </button>
            <div className="auth-footer">
              Don't have an account?{" "}
              <span>
                {" "}
                <NavLink to="/register">Register</NavLink>
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
