import { placeBid } from '../api/bids/placeBid.js';
import { fetchAuctionDetails } from '../api/auctions/auctionDetails.js';

/**
 * Handles the 'click' event for the place bid button.
 *
 * @param {string} auctionId - The ID of the auction.
 */
export function handlePlaceBid(auctionId) {
    const placeBidButton = document.getElementById('placeBidButton');
    const bidAmountInput = document.getElementById('bidAmountInput');
    const responseMessage = document.getElementById('responseMessage');

    if (!placeBidButton || !bidAmountInput || !responseMessage) {
        console.error('One or more elements could not be found in the document.');
        return;
    }

    placeBidButton.addEventListener('click', async function () {
        const bidAmount = Number(bidAmountInput.value);
        if (isNaN(bidAmount)) {
            responseMessage.textContent = 'Please enter a valid bid amount.';
            responseMessage.style.color = 'red';
            return;
        }

        try {
            const auctionDetails = await fetchAuctionDetails(auctionId);
            const currentBid = auctionDetails.bids && auctionDetails.bids.length > 0 
                ? auctionDetails.bids[auctionDetails.bids.length - 1].amount 
                : 0;

            if (bidAmount <= currentBid) {
                responseMessage.textContent = 'Your bid must be higher than the current bid.';
                responseMessage.style.color = 'red';
                return;
            }

            await placeBid(auctionId, bidAmount);
            responseMessage.textContent = 'Your bid has been placed successfully! Taking you back.';
            responseMessage.style.color = 'green';
            
            setTimeout(function() {
                location.reload();
            }, 1500);
        } catch (error) {
            console.error(error);
            responseMessage.textContent = error.errors ? error.errors[0].message : 'An error occurred while placing your bid. Please try again.';
            responseMessage.style.color = 'red';
        }
    });
}