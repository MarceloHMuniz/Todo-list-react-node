import React, { useEffect, useState } from "react";
import { useAuth } from '../context/authContext';
import { Navigate } from "react-router-dom";
import axios from "axios";

interface IPrivateRoutes {
  children: React.ReactElement;
}

export const PrivateRoute: React.FC<IPrivateRoutes> = ({ children }) => {
  const { token } = useAuth();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/validateToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        
        setIsValidToken(response.data.isValid);
      } catch (err) {
        setIsValidToken(false);
      } 
    };

    if (token) {
      validateToken();
    } 
  }, [token]);



  if (isValidToken) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
