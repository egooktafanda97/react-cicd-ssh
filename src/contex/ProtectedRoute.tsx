import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AxiosService from '@/services/AxiosService';
import { Utils } from '@/utils/Utils';
import { PermissionContext } from '@/contex/PermissionProviderContex';
import { useDispatch } from 'react-redux';

const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getAuthToken(),
    headers: {
        'Content-Type': 'application/json',
    },
});

const ProtectedRoute: React.FC = () => {
    const [token, setTokenState] = useState<string | null>(Utils.getAuthToken());
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null: masih memverifikasi
    const dispatch = useDispatch();


    const verifyToken = async (): Promise<void> => {
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const response = await ApiRequest.post('/auth/verify-token', { token });
            setIsAuthenticated(response.status === 200);
            dispatch({
                type: 'Auth',
                payload: {
                    token: Utils.getAuthToken(),
                    user: Utils.getUser(),
                },
            });
        } catch (err) {
            console.error('Token verification failed:', err);
            setIsAuthenticated(false);
        } finally {

        }
    };

    useEffect(() => {
        verifyToken();
    }, [token]);

    // Redirect ke login jika tidak terautentikasi
    if (isAuthenticated === false) {
        return;
        return <Navigate to="/login" replace />;
    }

    // Jika terautentikasi, render Outlet
    return <Outlet />;
};

export default ProtectedRoute;
