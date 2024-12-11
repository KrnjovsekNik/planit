import React from 'react';
import { Navigate } from 'react-router-dom';

function UporabnikPrijavljen({ children }) {
  const username = sessionStorage.getItem('username');
  return username && username !== "" ? children : <Navigate to="/login" replace />;
}

export default UporabnikPrijavljen;
