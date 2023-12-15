import { initializeNavbar } from "./js/listeners/initializeNavbar.js";
import { displayAuctions } from "./js/views/displayAuctions.js"
import { setupOpenDetailsModalEventListener} from './js/listeners/setupOpenDetailsModalEventListener.js'; 
import { logoutListener } from './js/listeners/logoutListener.js';

/**
 * Initializes the application and displays the auctions.
 *
 * @returns {Promise<void>} A promise that resolves when the application has been initialized and the auctions have been displayed.
 */
initializeNavbar().then(() => {
    displayAuctions().then(() => {
        setupOpenDetailsModalEventListener();
        logoutListener();
    });
});