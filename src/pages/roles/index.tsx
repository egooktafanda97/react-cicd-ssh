import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RolePage from './role.pages';
import RolePermission from './role-permission.pages';


const RolesModule = () => {
  return (
    <Routes>
      <Route path='/' element={<RolePage />} />
      <Route path='/role-permissions/:roleId' element={<RolePermission />} />
    </Routes>
  );
};

export default RolesModule;
