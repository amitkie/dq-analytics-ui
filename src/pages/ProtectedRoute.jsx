import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { apiNodeJSClient } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Cache authentication status
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuthentication = async () => {
      if (token && isAuthenticated === null) { // Only fetch if not already checked
        try {
          const response = await apiNodeJSClient.get('/api/v1/isLoggedIn');
          if (response.status === 200) {
            setIsAuthenticated(true); // User authenticated
          } else {
            setIsAuthenticated(false); // Failed authentication
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          setIsAuthenticated(false); // Handle error as failed authentication
        }
      } else if (!token) {
        setIsAuthenticated(false); // No token means unauthenticated
      }
    };

    checkAuthentication();
  }, [token, isAuthenticated]); // Dependency ensures it runs only when necessary

  if (isAuthenticated === null) {
    return <div></div>; // Show loading state while checking authentication
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
