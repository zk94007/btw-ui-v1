class LocalStorageManager {
    getItem = key => {
        const item = localStorage.getItem(key);
        return !!item ? JSON.parse(item) : null;
    };

    setItem = (key, object) => {
        localStorage.setItem(key, JSON.stringify(object));
    };

    removeItem = key => {
        localStorage.removeItem(key);
    };
}

export default new LocalStorageManager();
