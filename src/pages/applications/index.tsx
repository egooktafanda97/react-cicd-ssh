import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ApplicationPages from './application.pages';

export default function ApplicationModel() {
    return (
        <Routes>
            <Route path='/' element={<ApplicationPages />} />
        </Routes>
    );
}
