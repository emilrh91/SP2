import { API_BASE_URL } from "../URL/API_BASE_URL.js";

/**
 * Logs in a user account and returns the token and user name.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves to the response of the login operation.
 * @throws Will throw an error if the login operation fails.
 */
export async function loginUserAccount(email, password) {
    try {
        const url = `${API_BASE_URL}/auction/auth/login`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        };

        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors[0].message);
        }

        return { token: data.accessToken, name: data.name };
    } catch (error) {
        throw new Error(error.message);
    }
}