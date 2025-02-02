class CookieUtils {
    /**
     * Menyimpan token ke dalam cookie.
     * @param key - Nama cookie.
     * @param value - Nilai token yang akan disimpan.
     * @param maxAge - Waktu hidup cookie dalam detik (opsional).
     */
    static setCookie(key: string, value: string, maxAge?: number): void {
        let cookie = `${key}=${encodeURIComponent(value)}; path=/;`;

        if (maxAge) {
            cookie += ` max-age=${maxAge};`;
        }

        cookie += ` secure; sameSite=Strict;`;

        document.cookie = cookie;
    }

    /**
     * Mengambil nilai cookie berdasarkan nama.
     * @param key - Nama cookie yang ingin diambil.
     * @returns Nilai cookie atau null jika tidak ditemukan.
     */
    static getCookie(key: string): string | null {
        const cookies = document.cookie.split('; ');

        for (const cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.split('=');
            if (cookieKey === key) {
                return decodeURIComponent(cookieValue);
            }
        }

        return null;
    }

    /**
     * Menghapus cookie berdasarkan nama.
     * @param key - Nama cookie yang ingin dihapus.
     */
    static removeCookie(key: string): void {
        document.cookie = `${key}=; path=/; max-age=0; secure; sameSite=Strict;`;
    }
}

export default CookieUtils;
