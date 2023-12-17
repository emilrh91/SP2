import { API_BASE_URL } from "../URL/API_BASE_URL.js";
import { getFromLocalStorage } from "../../storage/storageHandler.js";

/**
 * Updates the avatar of a specific user.
 *
 * @param {string} userName - The name of the user.
 * @param {string} avatarUrl - The new avatar URL.
 * @returns {Promise<string>} A promise that resolves to the new avatar of the user.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function updateAvatar(userName, avatarUrl) {
    try {
        const token = getFromLocalStorage('userToken');
        const url = `${API_BASE_URL}/auction/profiles/${userName}/media`;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar: avatarUrl })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors[0].message);
        }

        return data.avatar;
    } catch (error) {
        throw new Error(error.message);
    }
}