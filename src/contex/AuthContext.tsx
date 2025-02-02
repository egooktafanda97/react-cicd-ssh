import React, { createContext, useContext, useState, useEffect } from 'react';
import AxiosService from '../services/AxiosService';

// Tipe untuk context
interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    verifyToken: () => Promise<boolean>;
    setToken: (token: string | null) => void;
}

// Inisialisasi AxiosService dengan token dari localStorage
const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: localStorage.getItem('token') ?? '',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Context awal
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Middleware untuk memverifikasi token
    const verifyToken = async (): Promise<boolean> => {
        if (!token) {
            setIsAuthenticated(false);
            return false;
        }
        try {
            const response = await ApiRequest.post('/auth/verify-token', { token });
            const isValid = response.status === 200;
            setIsAuthenticated(isValid);
            return isValid;
        } catch (err) {
            console.error('Token verification failed:', err);
            setIsAuthenticated(false);
            return false;
        }
    };

    // Sinkronisasi token dengan localStorage
    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    // Efek untuk memverifikasi token setiap kali token berubah
    useEffect(() => {
        const verify = async () => {
            if (token) {
                await verifyToken();
            } else {
                setIsAuthenticated(false);
            }
        };
        verify();
    }, [token]); // Efek dipicu setiap kali token berubah

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, verifyToken, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook untuk menggunakan context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
