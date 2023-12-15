import { API_BASE_URL } from "../URL/API_BASE_URL.js";
import { getFromLocalStorage } from "../../storage/storageHandler.js";

/**
 * Posts a new auction.
 *
 * @param {Object} auctionData - The data of the auction to post.
 * @returns {Promise<Object>} A promise that resolves to the response of the post operation.
 * @throws Will throw an error if the post operation fails.
 */
export async function postNewAuction(auctionData) {
    try {
        const postNewAuctionURL = `${API_BASE_URL}/auction/listings`;
        const token = getFromLocalStorage('userToken');

        const requestOptions = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(auctionData),
        };

        const response = await fetch(postNewAuctionURL, requestOptions);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors[0].message);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}