import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosConfig {
    baseURL?: string;
    token?: string;
    headers?: Record<string, string>;
}

class AxiosService {
    private instance = axios.create();
    private defaultHeaders: Record<string, string> = {};

    constructor(config?: AxiosConfig) {

        if (config?.baseURL) {
            this.instance.defaults.baseURL = config.baseURL;
        }

        if (config?.token) {
            this.defaultHeaders['Authorization'] = `Bearer ${config.token}`;
        }
        if (config?.headers) {
            this.defaultHeaders = { ...this.defaultHeaders, ...config.headers };
        }

        // Set default headers
        this.instance.interceptors.request.use((request: any) => {
            request.headers = { ...this.defaultHeaders, ...request.headers };
            return request;
        });
    }

    setHeaders(headers: Record<string, string>) {
        this.defaultHeaders = { ...this.defaultHeaders, ...headers };
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return await this.instance.get<T>(url, config);
        } catch (error: any) {
            throw error.response || error;
        }
    }

    async post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        try {
            console.log(config);

            return await this.instance.post<T>(url, data, config);
        } catch (error: any) {
            throw error.response || error;
        }
    }

    async put<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        try {
            return await this.instance.put<T>(url, data, config);
        } catch (error: any) {
            throw error.response || error;
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return await this.instance.delete<T>(url, config);
        } catch (error: any) {
            throw error.response || error;
        }
    }

    // Custom request method for optional HTTP methods
    async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return await this.instance.request<T>(config);
        } catch (error: any) {
            throw error.response || error;
        }
    }
}

export default AxiosService;
