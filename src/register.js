import { setUpRegistrationFormEventListener } from "./js/listeners/createUserAccount.js";
import { initializeNavbar } from "./js/listeners/initializeNavbar.js";
import { logoutListener } from './js/listeners/logoutListener.js';

/**
 * Initializes the registration page.
 *
 * @returns {Promise<void>} A promise that resolves when the page has been initialized.
 */
initializeNavbar().then(() => {
    setUpRegistrationFormEventListener();
    logoutListener();
});