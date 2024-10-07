import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("id"); // Check if user is logged in

  if (!isAuthenticated) {
    return <Navigate to="/userlogin" replace />; // Redirect to login page if not logged in
  }

  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
