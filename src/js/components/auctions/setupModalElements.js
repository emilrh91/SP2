/**
 * Sets up the modal elements for an auction.
 *
 * @param {Object} auctionDetails - The details of the auction.
 * @param {string} currentuserName - The username of the current user.
 */
export function setupModalElements(auctionDetails, currentUserName) {
    const bidNowButton = document.getElementById("placeBidButton");
    const bidAmountField = document.getElementById("bidAmountInput");
    const bidAmountLabel = document.querySelector('label[for="bidAmountInput"]');
    const placeBid = document.querySelector(".placeBid");
    const deleteButton = document.getElementById('deleteButton');

    const isSeller = auctionDetails.seller && auctionDetails.seller.name === currentUserName;
    const displayStyle = isSeller ? 'none' : 'block';

    if (bidNowButton) bidNowButton.style.display = displayStyle;
    if (bidAmountField) bidAmountField.style.display = displayStyle;
    if (bidAmountLabel) bidAmountLabel.style.display = displayStyle;
    if (placeBid) placeBid.style.display = displayStyle;
    if (deleteButton) deleteButton.style.display = isSeller ? 'block' : 'none';
}