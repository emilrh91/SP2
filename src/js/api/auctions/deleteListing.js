import { API_BASE_URL } from "../URL/API_BASE_URL.js";
import { getFromLocalStorage } from "../../storage/storageHandler.js";

/**
 * Deletes a specific auction listing.
 *
 * @param {string} auctionId - The ID of the auction to delete.
 * @returns {Promise<Response>} A promise that resolves to the response of the delete operation.
 * @throws Will throw an error if the delete operation fails.
 */
export async function deleteListing(auctionId) {
    try {
        const url = `${API_BASE_URL}/auction/listings/${auctionId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getFromLocalStorage('userToken')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        throw new Error('Could not delete auction:', error);
    }
}