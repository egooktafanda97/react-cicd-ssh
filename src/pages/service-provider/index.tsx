import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServicePage from './service.pages';
import ServicePermissions from './service.permissions';

const ServiceModule = () => {
  return (
    <Routes>
      <Route path='/' element={<ServicePage />} />
      <Route path='/permission/:id' element={<ServicePermissions />} />
    </Routes>
  );
};

export default ServiceModule;
