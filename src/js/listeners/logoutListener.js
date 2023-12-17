import { logout } from '../api/auth/logout.js';

/**
 * Adds an event listener to the logout button.
 */
export function logoutListener() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        logout();
      });
    }
}