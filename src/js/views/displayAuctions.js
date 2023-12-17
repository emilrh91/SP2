import { listAuctions } from "../api/auctions/listings.js";
import { auctionCountdownTimer } from "../components/auctions/auctionCountdownTimer.js";

/**
 * Displays the auctions.
 *
 * @param {Array} auctions - The auctions to display.
 * @param {Array} categories - The categories to filter by.
 * @returns {Array} The displayed auctions.
 */
export async function displayAuctions(auctions, categories = ['all']) {
    // If auctions is not provided, fetch the auctions
    if (!auctions) {
        auctions = await listAuctions();
    }

    auctions = categories.includes('all')
        ? auctions
        : auctions.filter(auction => auction.tags.some(tag => categories.includes(tag)));


    auctions = auctions.sort((a, b) => b._count.bids - a._count.bids);

    const auctionContainer = document.getElementById('auctionContainer');
    const auctionTemplate = document.getElementById('auctionTemplate').content;

    auctionContainer.innerHTML = '';

    for (const auction of auctions) {
        const { id, description = '', tags, title, media, endsAt, _count: { bids } } = auction;
    
        const auctionNode = auctionTemplate.cloneNode(true);
    
        auctionNode.querySelector('div').dataset.id = id;
        auctionNode.querySelector('div').dataset.description = description;
        const trimmedTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
        auctionNode.querySelector('.auctionTitle').textContent = trimmedTitle;
        auctionNode.querySelector('.auctionImg').src = media[0] ? media[0] : '../../../src/images/hammer.jpg';
    
        const auctionEndsElement = auctionNode.querySelector('.auctionEnds');
    
        const endsAtTime = new Date(endsAt).getTime();
        auctionCountdownTimer(endsAtTime, auctionEndsElement);
        const highestBidAmount = auction.bids ? auction.bids.reduce((max, bid) => Math.max(max, bid.amount), 0) : 0;
        auctionNode.querySelector('.auctionBids').textContent = `Bids: ${bids}, Highest bid: ${highestBidAmount}`;
    
        auctionNode.querySelector('.auctionTags').textContent = `Category: ${tags.join(', ')}`;

        auctionContainer.appendChild(auctionNode);
    }

    return auctions; 
}