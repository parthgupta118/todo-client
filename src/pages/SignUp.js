import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import FormImage from "../assets/images/HeroImage.jpg";
import { authActions } from "../slices/authSlice";
import "../styles/SignUp.css";
import { toast } from "react-toastify";

// Initial Formik Setup
const initialValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

// Validation Schema for formik signup form
const signUpSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  last_name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required!"),
  username: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .lowercase("Username must be in lowercase")
    .strict()
    .required("Required!"),
  email: Yup.string().email().required("Required!"),
  password: Yup.string()
    .min(6, "Min Length: 8 characters")
    .max(64, "Max Length: 64 characters")
    .required("Password Required"),
});

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState(initialValues);

  // Auto-Subscribing to the authentication from auth slice.
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const users = useSelector((state) => state.auth.users);

  /**
   * Handle Register.
   * @summary It will register the user and store the user with all the users in the localStorage and will load initial data.
   * @param {values} values - The signup values retrieved from the formik form fields.
   */
  const handleRegister = (values, { setSubmitting }) => {
    const hash = users.map((e) => [e.username, e.password, e.toDos]);
    for (let key of hash) {
      if (key[0] === values.username) {
        return toast.error("User Already Exists");
      }
    }

    dispatch(authActions.registerUser(values));
    return navigate('/login');
    // dispatch(authActions.loadUser(values));
  };

  // After registering, it will redirect to Dashboard
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img src={FormImage} alt="SignUp Form" />
      </div>
      <div className="form-section">
        <Formik
          initialValues={signUpData}
          validationSchema={signUpSchema}
          enableReinitialize={true}
          onSubmit={handleRegister}
        >
          <Form className="form-fields">
            <div className="form-heading">Sign Up</div>
            <div className="fullname-group">
              <div className="form-field">
                <Field
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  autoComplete="none"
                />
                <ErrorMessage
                  component="div"
                  className="text-danger"
                  name="first_name"
                />
              </div>

              <div className="form-field">
                <Field
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  autoComplete="none"
                />
                <ErrorMessage
                  component="div"
                  className="text-danger"
                  name="last_name"
                />
              </div>
            </div>
            <div className="form-field">
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                autoComplete="none"
              />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="username"
              />
            </div>

            <div className="form-field">
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage
                component="div"
                className="text-danger"
                name="email"
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
              Create Account
            </button>
            <div className="auth-footer">
              Already have an account?{" "}
              <span>
                <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
