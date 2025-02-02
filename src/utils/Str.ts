export class Str {
    /**
     * Membuat huruf pertama dalam string menjadi huruf besar.
     * @param text - String yang ingin dimanipulasi.
     * @returns String dengan huruf pertama menjadi huruf besar.
     */
    static cap(text: string): string {
        if (!text) return text;
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    /**
     * Membuat seluruh string menjadi huruf besar.
     * @param text - String yang ingin dimanipulasi.
     * @returns String dengan semua huruf kapital.
     */
    static upp(text: string): string {
        return text.toUpperCase();
    }

    /**
     * Membuat seluruh string menjadi huruf kecil.
     * @param text - String yang ingin dimanipulasi.
     * @returns String dengan semua huruf kecil.
     */
    static low(text: string): string {
        return text.toLowerCase();
    }
}
