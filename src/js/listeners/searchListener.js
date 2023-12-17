import { searchAuctions } from "../api/auctions/searchAuction.js";
import { displayAuctions } from "../views/displayAuctions.js";
import { setupOpenDetailsModalEventListener } from './setupOpenDetailsModalEventListener.js';

/**
 * Handles the search event.
 *
 * @param {Event} event - The event object.
 */
export async function searchListener(event) {
    event.preventDefault();
    const searchText = document.getElementById('searchInput').value;
    const auctions = await searchAuctions(searchText);
    displayAuctions(auctions);
    setupOpenDetailsModalEventListener();
}