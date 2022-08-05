import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from './../../context/index';

const RouteGuardian = () => {
  let user = useContext(UserContext);
  console.log(user);

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default RouteGuardian;
