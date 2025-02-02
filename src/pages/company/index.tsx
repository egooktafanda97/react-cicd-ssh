import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CompanyPages from './company.pages';
import CompanyCreate from './company.create';
import CompanyUpdate from './company.update';
import CompanyDetail from './company.detail';

const CompanyModule = () => {
  return (
    <Routes>
      <Route path='/' element={<CompanyPages />} />
      <Route path='/create' element={<CompanyCreate />} />
      <Route path='/update/:id' element={<CompanyUpdate />} />
      <Route path='/detail/:id' element={<CompanyDetail />} />
    </Routes>
  );
};

export default CompanyModule;
