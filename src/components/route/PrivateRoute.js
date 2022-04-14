import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


// Handling Private Routes
const PrivateRoute = ({ component: Component }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (isAuth) {
    return (
      <Fragment>
        <Component />;
      </Fragment>
    );
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
