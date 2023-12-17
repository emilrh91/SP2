import { API_BASE_URL } from '../URL/API_BASE_URL.js';

/**
 * Searches auctions based on the provided search text.
 *
 * @param {string} searchText - The text to search auctions for.
 * @returns {Promise<Array>} A promise that resolves to an array of auctions that match the search text.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function searchAuctions(searchText) {
    try {
        const url = `${API_BASE_URL}/auction/listings?sort=created&_bids=true&_seller=true&_tags=true&_active=true`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let auctions = await response.json();

        if (searchText) {
            const lowerCaseSearchText = searchText.toLowerCase();
            auctions = auctions.filter(auction => 
                auction.title.toLowerCase().includes(lowerCaseSearchText) ||
                auction.description?.toLowerCase().includes(lowerCaseSearchText) ||
                auction.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchText))
            );
        }

        return auctions;
    } catch (error) {
        throw new Error('Could not fetch auctions:', error);
    }
}