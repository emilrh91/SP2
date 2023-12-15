import { initializeNavbar } from "./js/listeners/initializeNavbar.js";
import { LoginUserEventListener } from "./js/listeners/loginUser.js";
import { logoutListener } from './js/listeners/logoutListener.js';

/**
 * Initializes the application and sets up event listeners for user login and logout.
 *
 * @returns {Promise<void>} A promise that resolves when the application has been initialized and the event listeners have been set up.
 */
initializeNavbar().then(() => {
    LoginUserEventListener();
    logoutListener();
});