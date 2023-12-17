import { API_BASE_URL } from "../URL/API_BASE_URL.js";
import { getFromLocalStorage } from "../../storage/storageHandler.js";

/**
 * Fetches the listings of a specific user.
 *
 * @param {string} userName - The name of the user.
 * @returns {Promise<Array>} A promise that resolves to the listings of the user.
 * @throws Will throw an error if the fetch operation fails.
 */
export function fetchListings(userName) {
    const token = getFromLocalStorage('userToken');
    const url = `${API_BASE_URL}/auction/profiles/${userName}/listings?_listings=true&_bids=true`;

    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(e => {
        throw new Error('There was a problem with your fetch operation: ' + e.message);
    });
}