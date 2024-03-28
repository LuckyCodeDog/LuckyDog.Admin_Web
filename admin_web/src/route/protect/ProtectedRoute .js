import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated,children  }) => {
    if (!isAuthenticated) {
      console.log(!isAuthenticated)
        return <Navigate to="/login" replace />;
      }
      return children;
  };

export default ProtectedRoute