import { fetchBids } from "../api/profile/fetchBids.js"; 
import { displayMyBids } from "../views/displayMyBids.js";  

/**
 * Sets up an event listener for fetching and displaying bids.
 *
 * @param {string} userName - The user name to fetch bids for.
 */
export function setupFetchBidsListener(userName) {
    document.querySelector('#bidsHeading button').addEventListener('click', () => {
        fetchBids(userName)
            .then(async bids => {
                bids.sort((a, b) => {
                    const aEndsAt = new Date(a.endsAt).getTime();
                    const bEndsAt = new Date(b.endsAt).getTime();
    
                    if (aEndsAt < Date.now() && bEndsAt >= Date.now()) {
                        return 1;
                    } else if (bEndsAt < Date.now() && aEndsAt >= Date.now()) {
                        return -1;
                    }
    
                    return aEndsAt - bEndsAt;
                });
    
                await displayMyBids(bids);
                
            })
            .catch(error => console.error('Error:', error));
    });
}