import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TaxPages from './tax.pages';


const CompanyModule = () => {
    return (
        <Routes>
            <Route path='/' element={<TaxPages />} />
        </Routes>
    );
};

export default CompanyModule;
