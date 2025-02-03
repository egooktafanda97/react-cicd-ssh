import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '@/contex/ProtectedRoute.tsx';
import SignIn from '@/pages/auth/signin.tsx';
import DashbaordPage from '@/pages/dashboard/page.tsx';
import CompanyModule from '@/pages/company/index.tsx';
import ServiceModule from '@/pages/service-provider';
import SignOut from '@/pages/auth/signout';
import ApplicationModel from '@/pages/applications';
import RolesModule from '@/pages/roles';
import UsersModule from '@/pages/users';
const App = lazy(() => import('@/pages/App.tsx'));
const Error401 = lazy(
    () => import('@/container/error/error-401/error-401.tsx')
);
const Error404 = lazy(
    () => import('@/container/error/error-404/error-404.tsx')
);
const Error500 = lazy(
    () => import('@/container/error/error-500/error-500.tsx')
);
const Authenticationlayout = lazy(
    () => import('@/pages/authenticationlayout.tsx')
);

export default function Routing() {
    return (
        <Routes>
            <Route
                path={`${import.meta.env.VITE_META_BASE_PATH}/`}
                element={<SignIn />}></Route>
            <Route
                path={`${import.meta.env.VITE_META_BASE_PATH}/login`}
                element={<SignIn />}></Route>
            <Route
                path={`${import.meta.env.VITE_META_BASE_PATH}/logout`}
                element={<SignOut />}></Route>
            <Route
                path={`${import.meta.env.VITE_META_BASE_PATH}`}
                element={<Authenticationlayout />}>
                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}error/error-401`}
                    element={<Error401 />}
                />
                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}error/error-404`}
                    element={<Error404 />}
                />
                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}error/error-500`}
                    element={<Error500 />}
                />
            </Route>
            <Route path={`${import.meta.env.VITE_META_BASE_PATH}`} element={<App />}>
                {/* <Route element={<ProtectedRoute />}> */}
                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}dashboard`}
                    element={<DashbaordPage />}
                />
                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}app-services/*`}
                    element={<ApplicationModel />} />
                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}company/*`}
                    element={<CompanyModule />}
                />

                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}services/*`}
                    element={<ServiceModule />}
                />
                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}roles/*`}
                    element={<RolesModule />}
                />
                <Route
                    path={`${import.meta.env.VITE_META_BASE_PATH}users/*`}
                    element={<UsersModule />}
                />
                {/* </Route> */}
            </Route>
        </Routes>
    );
}
