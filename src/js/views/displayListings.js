import { createAuctionCard } from "../components/auctions/createAuctionCard.js";
import { showDetailsModal } from '../views/showDetailsModal.js';

export function displayListings(listings) {
    return new Promise((resolve) => {
        const myListingsContainer = document.querySelector('#my-listings-container');
        myListingsContainer.innerHTML = '';  

        listings.forEach(listing => {
            const card = createAuctionCard(listing);
            myListingsContainer.appendChild(card);

            card.addEventListener('click', () => {
                showDetailsModal(listing.id);
            });
        });

        resolve();
    });
}