import { initializeNavbar } from "./js/listeners/initializeNavbar.js";
import { setupNewAuctionFormListener } from "./js/listeners/setupNewAuctionFormListener.js";
import { addMultipleMediaListener } from "./js/listeners/addMultipleMediaListener.js";
import { logoutListener } from './js/listeners/logoutListener.js';

/**
 * Initializes the auction page.
 *
 * @returns {Promise<void>} A promise that resolves when the page has been initialized.
 */
initializeNavbar().then(() => {
    setupNewAuctionFormListener();
    addMultipleMediaListener();
    logoutListener();
});