export interface LocalStorage {
    idAttrSelector: string;
}
export class TypedLocalStorage {
    static get<K extends keyof LocalStorage>(key: K): LocalStorage[K] | null {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as LocalStorage[K]) : null;
    }

    static set<K extends keyof LocalStorage>(key: K, value: LocalStorage[K]): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove<K extends keyof LocalStorage>(key: K): void {
        localStorage.removeItem(key);
    }
}
