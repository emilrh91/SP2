import { API_BASE_URL } from "../URL/API_BASE_URL.js";

/**
 * Lists all auctions.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of auctions.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function listAuctions() {
    try {
        const url = `${API_BASE_URL}/auction/listings?sort=created&_bids=true&_seller=true&_tags=true`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const auctions = await response.json();
        return auctions;
    } catch (error) {
        throw new Error('Could not fetch auctions:', error);
    }
}