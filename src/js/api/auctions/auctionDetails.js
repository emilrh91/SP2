import { API_BASE_URL } from "../URL/API_BASE_URL.js";

/**
 * Fetches the details of a specific auction.
 *
 * @param {string} auctionId - The ID of the auction to fetch details for.
 * @returns {Promise<Object>} A promise that resolves to the details of the auction.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchAuctionDetails(auctionId) {
    try {
        const url = `${API_BASE_URL}/auction/listings/${auctionId}?_seller=true&_bids=true&sort=created&sortOrder=desc`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const auctionDetails = await response.json();
        return auctionDetails;
    } catch (error) {
        throw new Error('Could not fetch auctions:', error);
    }
}