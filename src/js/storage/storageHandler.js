/**
 * Saves a value to localStorage.
 *
 * @param {string} key - The key under which the value is stored.
 * @param {any} value - The value to store.
 */
export function saveToLocalStorage(key, value) {
    try {
        const data = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, data);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Retrieves a value from localStorage.
 *
 * @param {string} key - The key under which the value is stored.
 * @returns {any} The retrieved value.
 */
export function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
}

/**
 * Removes a value from localStorage.
 *
 * @param {string} key - The key under which the value is stored.
 */
export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}