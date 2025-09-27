import {COOKIE_PATH} from "@/app/constants/constants";

export const isSessionStorageAvailable = () => {
    try{
        const test = 'sessionStorageTest';
        sessionStorage.setItem(test, 'test');
        sessionStorage.removeItem(test);
        return true;
    } catch {
        return false;
    }
}

export const isLocalStorageAvailable = () => {
    try {
        const test = 'localStorageTest';
        localStorage.setItem(test, 'test');
        localStorage.removeItem(test);
        return true;
    } catch { return false; }
};

export const removeFromCookie = (key: string) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${COOKIE_PATH};`;
}