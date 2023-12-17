import { createNavbar } from "../components/navBar/createNavbar.js";
import { fetchCredits } from '../api/profile/fetchCredits.js';
import { getFromLocalStorage } from '../storage/storageHandler.js';
import { searchListener } from "../listeners/searchListener.js";

/**
 * Initializes the navigation bar.
 *
 * @returns {Promise} A promise that resolves when the navigation bar is initialized.
 */
export function initializeNavbar() {
    return new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', async () => {
            const headerElement = document.getElementById('header');
            if (headerElement) {
                const userToken = getFromLocalStorage('userToken');
                const userName = userToken ? getFromLocalStorage('userName') : 'Log In';
                let credits = 0;
                if (userToken) {
                    try {
                        credits = await fetchCredits();
                    } catch (error) {
                        console.error('Error fetching credits:', error);
                    }
                }

                const currentPage = window.location.pathname;
                const includeSearchForm = currentPage !== '/pages/myProfile.html';

                headerElement.innerHTML = createNavbar(userName, credits, includeSearchForm);
                
                if (includeSearchForm && document.getElementById('auctionTemplate')) {
                    const searchForm = document.getElementById('searchForm');
                    if (searchForm) {
                        searchForm.addEventListener('submit', searchListener);
                    }
                }
            }
            resolve();
        });
    });
}