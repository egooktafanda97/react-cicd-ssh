import React from 'react';
import { Navigate } from 'react-router-dom';

export default function SignOut() {

  return <Navigate to="/login" replace />;
}
