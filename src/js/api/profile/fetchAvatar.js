import { API_BASE_URL} from "../URL/API_BASE_URL.js";
import { getFromLocalStorage } from "../../storage/storageHandler.js";

/**
 * Fetches the avatar of a specific user.
 *
 * @param {string} userName - The name of the user.
 * @returns {Promise<string>} A promise that resolves to the avatar of the user.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function fetchAvatar(userName) {
    try {
        const token = getFromLocalStorage('userToken');
        const url = `${API_BASE_URL}/auction/profiles/${userName}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        return data.avatar;
    } catch (error) {
        throw new Error('Could not fetch avatar: ' + error);
    }
}