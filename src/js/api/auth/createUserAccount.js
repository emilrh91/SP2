import { API_BASE_URL } from "../URL/API_BASE_URL.js";

/**
 * Creates a new user account and logs in to get the token.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {string} avatar - The avatar of the user.
 * @param {string} banner - The banner of the user.
 * @returns {Promise<Object>} A promise that resolves to the response of the create and login operations.
 * @throws Will throw an error if the create or login operation fails.
 */
export async function createUserAccount(name, email, password, avatar, banner = '') {
    try {
        const registerURL = `${API_BASE_URL}/auction/auth/register`;
        const loginURL = `${API_BASE_URL}/auction/auth/login`;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, avatar, banner }),
        };

        const response = await fetch(registerURL, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors[0].message);
        }

        requestOptions.body = JSON.stringify({ email, password });
        const loginResponse = await fetch(loginURL, requestOptions);
        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
            throw new Error(loginData.errors[0].message);
        }

        return { data: loginData, token: loginData.accessToken, name: name }; 
    } catch (error) {
        throw new Error(error.message);
    }
}