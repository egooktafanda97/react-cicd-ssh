import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserCompanyPage from './user-company.pages';
import UserCompanyCrated from './user-company.create';
import UserCompanyUpdate from './user-company.update';
import UserCompanyRoles from './user-company.roles';


const UsersModule = () => {
    return (
        <Routes>
            <Route path='/' element={<UserCompanyPage />} />
            <Route path='/create' element={<UserCompanyCrated />} />
            <Route path='/update/:id' element={<UserCompanyUpdate />} />
            <Route path='/roles/:id' element={<UserCompanyRoles />} />
        </Routes>
    );
};

export default UsersModule;
