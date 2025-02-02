import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import AxiosService from "@/services/AxiosService";
import { Utils } from "@/utils/Utils";

// Define the structure of the permission context type
interface PermissionContextType {
    permissions: string[];
    isLoading: boolean;
    hasPermissionName: (permission: string) => boolean;
}

// Create the permission context
export const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

// Define the provider props
interface PermissionProviderProps {
    children: ReactNode;
}


const ApiRequest = new AxiosService({
    baseURL: import.meta.env.VITE_BASE_API,
    token: Utils.getToken() ?? '',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Create the provider component
export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
    const [permissions, setPermissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const hasPermissionName = (permissionName: string) => {
        for (let i = 0; i < permissions.length; i++) {
            const permis: any = permissions[i]?.permissions ?? [];
            if (permis.some((item: any) => item.name === permissionName))
                return true;
        }
        return false;
    };

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                setIsLoading(true);
                const response: any = await ApiRequest.get("/auth/read-permission");
                setPermissions(response.data)
            } catch (error) {
                console.error("Failed to fetch permissions", error);
                setPermissions([]); // Default to empty permissions on failure
            } finally {
                setIsLoading(false);
            }
        };

        fetchPermissions();
    }, []);

    return (
        <PermissionContext.Provider value={{ permissions, isLoading, hasPermissionName }}>
            {children}
        </PermissionContext.Provider>
    );
};
