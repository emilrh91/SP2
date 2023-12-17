import { getFromLocalStorage } from '../../storage/storageHandler.js';

/**
 * Creates a navigation bar.
 *
 * @param {string} userName - The name of the user.
 * @param {number} credits - The number of credits the user has.
 * @param {boolean} includeSearchForm - Whether to include a search form in the navigation bar.
 * @returns {string} The HTML for the navigation bar.
 */
export function createNavbar(userName, credits, includeSearchForm = true) {
    const userToken = getFromLocalStorage('userToken');
    const profileLink = userToken ? '/pages/myProfile.html' : '/pages/login.html';

    const logoutButton = userToken ? '<li class="nav-item"><a class="nav-link" id="logoutButton" href="#">Logout</a></li>' : '';

    const searchFormHTML = includeSearchForm ? `
        <form id="searchForm" class="d-flex" action="/pages/auctions.html" method="get">
            <input id="searchInput" class="form-control me-2" type="search" name="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-secondary" type="submit">Search Auctions</button>
        </form>
    ` : '';

    return  `
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="/index.html">Bits <img src="/src/images/gavel.png" alt="and" class="img-fluid"> Bids</a>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/pages/auctions.html">Auctions</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/pages/newAuction.html">Make New Auction</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${profileLink}">${userName}</a>
                        </li>
                        ${logoutButton}
                        <a class="nav-link disabled currency" href="#" tabindex="-1" aria-disabled="true">Currency: ${credits}</a>
                    </ul>
                    ${searchFormHTML}
                </div>
            </div>
        </nav>
    `;
}