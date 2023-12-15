import { createAuctionCard } from "../components/auctions/createAuctionCard.js";
import { showDetailsModal } from '../views/showDetailsModal.js';

/**
 * Displays the user's bids.
 *
 * @param {Array} bids - The bids to display.
 * @returns {Promise} A promise that resolves when the bids have been displayed.
 */
export function displayMyBids(bids) {
    return new Promise((resolve) => {
        const activeBidsContainer = document.getElementById('my-bids-container');

        activeBidsContainer.innerHTML = '';  

        bids.forEach(bid => {
            const card = createAuctionCard(bid);
            activeBidsContainer.appendChild(card);

            card.addEventListener('click', () => {
                showDetailsModal(card.dataset.id);
            });
        });

        resolve();
    });
}