import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserCompanyPage from './user-company.pages';


const UsersModule = () => {
    return (
        <Routes>
            <Route path='/' element={<UserCompanyPage />} />
        </Routes>
    );
};

export default UsersModule;
