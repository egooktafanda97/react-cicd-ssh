import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY as string;

// Fungsi Enkripsi
export function encrypt(text: string) {
    const iv = CryptoJS.lib.WordArray.random(16); // Inisialisasi Vector
    const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.toString()}`;
}