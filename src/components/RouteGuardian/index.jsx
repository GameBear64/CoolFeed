import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from './../../context/index';

const RouteGuardian = () => {
  let storage = useContext(UserContext);

  console.log(storage);

  if (!storage?.user) return <Navigate to="/register" replace />;

  return <Outlet />;
};

export default RouteGuardian;
