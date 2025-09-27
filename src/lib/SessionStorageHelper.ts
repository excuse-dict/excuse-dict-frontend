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