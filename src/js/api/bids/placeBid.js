import { API_BASE_URL } from "../URL/API_BASE_URL.js";
import { getFromLocalStorage} from "../../storage/storageHandler.js";

/**
 * Places a bid on a specific auction.
 *
 * @param {string} auctionId - The ID of the auction to place a bid on.
 * @param {number} amount - The amount of the bid.
 * @returns {Promise<Object>} A promise that resolves to the response of the bid operation.
 * @throws Will throw an error if the bid operation fails.
 */
export async function placeBid(auctionId, amount) {
    try {
        const token = getFromLocalStorage('userToken');
        const url = `${API_BASE_URL}/auction/listings/${auctionId}/bids?_seller=true&_bids=true`;

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount }),
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const errorResponse = await response.json();
            throw errorResponse;
        }

        return await response.json();
    } catch (error) {
        console.error('An error occurred while placing the bid:', error);
        throw error;
    }
}