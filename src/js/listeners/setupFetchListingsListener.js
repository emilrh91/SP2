import { fetchListings } from "../api/profile/fetchListingsUserName.js";
import { displayListings } from "../views/displayListings.js";

/**
 * Initializes the user profile page.
 *
 * @returns {Promise<void>} A promise that resolves when the page has been initialized.
 */
export function setupFetchListingsListener(userName){
    document.querySelector('#listingsHeading button').addEventListener('click', () => {
        fetchListings(userName)
            .then(async listings => {

            listings.sort((a, b) => {
                const aEndsAt = new Date(a.endsAt).getTime();
                const bEndsAt = new Date(b.endsAt).getTime();


                if (aEndsAt < Date.now() && bEndsAt >= Date.now()) {
                    return 1;
                } else if (bEndsAt < Date.now() && aEndsAt >= Date.now()) {
                    return -1;
                }

                return aEndsAt - bEndsAt;
            });

            await displayListings(listings);
            })
            .catch(error => console.error('Error:', error));
});
}