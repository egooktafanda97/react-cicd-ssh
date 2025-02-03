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
                path={`/`}
                element={<SignIn />}></Route>
            <Route
                path={`/login`}
                element={<SignIn />}></Route>
            <Route
                path={`/logout`}
                element={<SignOut />}></Route>
            <Route
                path={``}
                element={<Authenticationlayout />}>
                <Route
                    path={`error/error-401`}
                    element={<Error401 />}
                />
                <Route
                    path={`error/error-404`}
                    element={<Error404 />}
                />
                <Route
                    path={`error/error-500`}
                    element={<Error500 />}
                />
            </Route>
            <Route path={`/`} element={<App />}>
                {/* <Route element={<ProtectedRoute />}> */}
                <Route
                    path={`dashboard`}
                    element={<DashbaordPage />}
                />
                <Route
                    path={`app-services/*`}
                    element={<ApplicationModel />} />
                <Route
                    path={`company/*`}
                    element={<CompanyModule />}
                />

                <Route
                    path={`services/*`}
                    element={<ServiceModule />}
                />
                <Route
                    path={`roles/*`}
                    element={<RolesModule />}
                />
                <Route
                    path={`users/*`}
                    element={<UsersModule />}
                />
                {/* </Route> */}
            </Route>
        </Routes>
    );
}
