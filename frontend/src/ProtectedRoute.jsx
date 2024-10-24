// ProtectedLayout.js
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const userDetails = localStorage.getItem("userDetails");

  if (!userDetails) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />; // Renders the child routes if the user is authenticated
};

export default ProtectedLayout;
