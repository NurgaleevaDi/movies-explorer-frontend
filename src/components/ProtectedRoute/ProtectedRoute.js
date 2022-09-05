import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children, ...props }) => {
  //console.log('loggedIn ProtectedRoute ', loggedIn);
  return (
    <Route {...props}>{loggedIn ? children : <Redirect to="/signin" />}</Route>
  );
};

export default ProtectedRoute;