import { deleteListing } from "../api/auctions/deleteListing.js";

/**
 * Handles the delete button click event.
 *
 * @param {HTMLElement} deleteButton - The delete button element.
 * @param {string} auctionId - The ID of the auction.
 * @param {Modal} modal - The modal instance.
 */
export async function handleDeleteButtonClick(deleteButton, auctionId, modal) {
    deleteButton.addEventListener('click', async () => {
        try {
            const response = await deleteListing(auctionId);
            if (!response) {
                throw new Error('No response received from deleteListing function');
            }
            if (response.ok) {
                modal.hide();
                alert('Auction deleted successfully');
                setTimeout(() => location.reload(), 500);
            } else if (response.status === 404) {
                alert('This auction is already deleted');
                modal.hide();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    });
} 