/**
 * Creates an auction card.
 *
 * @param {Object} item - The item to create the auction card for.
 * @returns {HTMLElement} The created auction card.
 */
export function createAuctionCard(item) {
    const auction = item.listing || item;
    const isBid = item.hasOwnProperty('amount') && item.hasOwnProperty('bidderName');

    const card = document.createElement('div');
    card.className = 'col-sm-12 col-md-6 col-lg-4 mb-4 auctionCard';
    card.dataset.id = auction.id;

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card shadow h-100 d-flex flex-column w-100';
    card.appendChild(cardDiv);

    const img = document.createElement('img');
    img.className = 'card-img-top card-img-top-fit auctionImg';
    img.alt = 'Auction Image';
    img.src = auction.media && auction.media.length > 0 ? auction.media[0] : "/src/images/hammer.jpg";
    cardDiv.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);

    const title = document.createElement('h5');
    title.className = 'card-title auctionTitle';
    title.textContent = auction.title;
    cardBody.appendChild(title);

    const ends = document.createElement('p');
    ends.className = 'card-text auctionEnds';
    ends.textContent = `Ends: ${new Date(auction.endsAt).toLocaleString()}`;
    cardBody.appendChild(ends);

    const tags = document.createElement('p');
    tags.className = 'card-text auctionTags';
    tags.textContent = `Category: ${auction.tags.join(', ')}`;
    cardBody.appendChild(tags);

    const amount = document.createElement('p');
    amount.className = 'card-text bidAmount';
    if (isBid) {
        amount.textContent = `Amount: ${item.amount !== null ? item.amount : 0}`;
    } else if (auction.bids && auction.bids.length > 0) {
        const highestBidAmount = auction.bids.reduce((max, bid) => Math.max(max, bid.amount), 0);
        amount.textContent = `Current bid: ${highestBidAmount}`;
    } else {
        amount.textContent = 'No bids yet';
    }
    cardBody.appendChild(amount);

    return card;
}