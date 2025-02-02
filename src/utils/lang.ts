import en from './../assets/locales/en.json'; // Import JSON terjemahan

// Buat tipe data berdasarkan struktur JSON
type LocalizationKeys = typeof en;

// Implementasikan objek `Lang` dengan prototipe dot notation
class Lang {
    private translations: LocalizationKeys;

    constructor(translations: LocalizationKeys) {
        this.translations = translations;

        // Rekursif untuk membuat properti dinamis
        Object.keys(translations).forEach((key) => {
            const typedKey = key as keyof LocalizationKeys;
            (this as any)[typedKey] = this.createProxy(this.translations[typedKey]);
        });
    }

    private createProxy(value: unknown): any {
        if (typeof value === 'object' && value !== null) {
            return new Proxy(value as Record<string, unknown>, {
                get: (target, prop: string) => {
                    if (prop in target) {
                        return target[prop];
                    }
                    throw new Error(`Missing translation for key: ${String(prop)}`);
                },
            });
        }
        return value;
    }
}

// Inisialisasi objek `lang` berdasarkan JSON terjemahan
export const lang = new Lang(en) as LocalizationKeys & Lang;
