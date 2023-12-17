import { API_BASE_URL } from "../URL/API_BASE_URL.js";
import { getFromLocalStorage } from "../../storage/storageHandler.js";

/**
 * Fetches the credits of a specific user.
 *
 * @returns {Promise<number>} A promise that resolves to the credits of the user.
 * @throws Will throw an error if the fetch operation fails.
 */
export function fetchCredits() {
    const userName = getFromLocalStorage('userName');
    const token = getFromLocalStorage('userToken');
    const url = `${API_BASE_URL}/auction/profiles/${userName}/credits`;

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
    .then(data => data.credits);
}