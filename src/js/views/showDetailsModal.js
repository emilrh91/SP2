import { fetchAuctionDetails } from "../api/auctions/auctionDetails.js";
import { auctionCountdownTimer } from "../components/auctions/auctionCountdownTimer.js";
import { handlePlaceBid } from "../listeners/placeBidButtonListener.js";
import { getFromLocalStorage } from '../storage/storageHandler.js';
import { handleModalHidden } from "../listeners/handleModalHiddenListener.js";
import { handleDeleteButtonClick } from "../listeners/handleDeleteButtonListener.js";
import { setupCarousel } from "../components/auctions/setupCarousel.js";
import { setupModalElements} from "../components/auctions/setupModalElements.js";

/**
 * Shows the details modal for an auction.
 *
 * @param {string} auctionId - The ID of the auction.
 */
export async function showDetailsModal(auctionId) {
    const modalElement = document.getElementById('auctionModal');
    const modal = new bootstrap.Modal(modalElement);
    
    const currentUserName = getFromLocalStorage('userName');

    const modalTitle = document.getElementById("auctionModalTitle");
    const modalDescription = document.getElementById("auctionModalDescription");
    const modalTags = document.getElementById("auctionModalTags");
    const modalEnds = document.getElementById("auctionModalEnds");
    const modalBids = document.getElementById("auctionModalBids");
    const modalSeller = document.getElementById("auctionModalSeller");
    const modalCurrentBidder = document.getElementById("auctionModalCurrentBidder");
    const modalSellerAvatar = document.getElementById("auctionModalSellerAvatar");

    modalTitle.classList.add('display-4'); 
    modalDescription.classList.add('lead'); 
    modalTags.classList.add('text-muted'); 
    modalBids.classList.add('font-weight-bold'); 
    modalSeller.classList.add('text-primary'); 
    modalCurrentBidder.classList.add('text-success'); 

    const auctionDetails = await fetchAuctionDetails(auctionId);

    const sortedBids = auctionDetails.bids.sort((a, b) => b.amount - a.amount);

    const highestBid = sortedBids[0];

    const lastBids = sortedBids.slice(1, 6);

    const lastBidder = highestBid ? highestBid.bidderName : 'No bids yet';

    handlePlaceBid(auctionId);


    let bidHistoryHtml = '<h5>Bid History:</h5><ul class="list-group">';
    lastBids.forEach(bid => {
        bidHistoryHtml += `<li class="list-group-item border-0 p-0">Bidder: ${bid.bidderName}, Amount: ${bid.amount}</li>`;
    });
    bidHistoryHtml += '</ul>';

    modalTitle.textContent = auctionDetails.title;
    modalDescription.textContent = `Auction Description: ${auctionDetails.description}`;
    const tagsHtml = auctionDetails.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join(' ');
    modalTags.innerHTML = `Category: ${tagsHtml}`;
    modalBids.textContent = `Bids: ${auctionDetails._count.bids}, Current bid: ${highestBid ? highestBid.amount : 'No bids yet'}`;
    modalSeller.textContent = `Seller: ${auctionDetails.seller.name}`;
    modalSellerAvatar.src = auctionDetails.seller.avatar;
    modalCurrentBidder.textContent = `Current Bidder: ${lastBidder}`;
    const bidHistoryDiv = document.getElementById('bidHistory');
    bidHistoryDiv.innerHTML = bidHistoryHtml;
    
    setupCarousel(auctionDetails);

    setupModalElements(auctionDetails, currentUserName);

    const endsAt = new Date(auctionDetails.endsAt).getTime();
    auctionCountdownTimer(endsAt, modalEnds);
    
    const deleteButton = document.getElementById('deleteButton');
    handleModalHidden(modalElement, modalEnds);
    handleDeleteButtonClick(deleteButton, auctionId, modal);

    modal.show();
}