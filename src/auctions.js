import { initializeNavbar } from "./js/listeners/initializeNavbar.js";
import { logoutListener } from "./js/listeners/logoutListener.js";
import { listAuctionsCheckbox } from "./js/listeners/listAuctionsCheckbox.js";
import { setupOpenDetailsModalEventListener } from "./js/listeners/setupOpenDetailsModalEventListener.js";

/**
 * Initializes the application.
 *
 * @returns {Promise<void>} A promise that resolves when the application has been initialized.
 */
initializeNavbar().then(() => {
  logoutListener();
  listAuctionsCheckbox().then(() => {
    setupOpenDetailsModalEventListener();
  });
});
