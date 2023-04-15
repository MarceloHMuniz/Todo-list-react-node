import React from "react";
import { useAuth } from '../context/authContext';
import { Navigate } from "react-router-dom";

interface IPrivateRoutes {
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<IPrivateRoutes> = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};