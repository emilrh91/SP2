import { removeFromLocalStorage } from '../../storage/storageHandler.js';

/**
 * Logs out a user by removing their data from localStorage and redirecting to the root of the application.
 */
export function logout() {
    removeFromLocalStorage('userName');
    removeFromLocalStorage('userEmail');
    removeFromLocalStorage('userToken');
    
    window.location.href = '/';
}