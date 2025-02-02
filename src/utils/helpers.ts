export const isEmpty = (value: any): boolean => {
    if (value === null || value === undefined) {
        return true; // null atau undefined
    }

    if (typeof value === 'string') {
        return (
            value.trim() === '' || // Cek string kosong (termasuk spasi)
            value === 'null' // String literal "null"
        );
    }

    if (Array.isArray(value)) {
        return value.length === 0; // Array kosong
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0; // Object kosong (tidak ada properti)
    }

    if (typeof value === 'number') {
        return isNaN(value); // Angka yang tidak valid (NaN)
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0; // Map atau Set kosong
    }

    return false; // Tidak kosong untuk semua tipe lain
};
