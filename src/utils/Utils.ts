export class Utils {
    static getAuthToken(): string {
        return localStorage.getItem('token') ?? '';
    }

    static baseApiUrl(): string {
        return import.meta.env.VITE_BASE_API as string;
    }

    static AutorizationHeader(): any {
        return {
            Authorization: `Bearer ${this.getAuthToken()}`,
        };
    }

    static getToken(): string {
        return localStorage.getItem('token') ?? '';
    }
    static getUser(): any {
        return this.JsonValidator(localStorage.getItem('user') ?? '{}') ?? {};
    }

    static JsonValidator(json: any): boolean {
        try {
            return JSON.parse(json);
        } catch (e) {
            return false;
        }
    }

}