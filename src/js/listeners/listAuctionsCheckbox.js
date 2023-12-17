import { displayAuctions } from "../views/displayAuctions.js";
import { listAuctions } from "../api/auctions/listings.js";
import { setupOpenDetailsModalEventListener } from './setupOpenDetailsModalEventListener.js';

let allAuctions;

/**
 * Lists auctions based on the selected category.
 */
export async function listAuctionsCheckbox() {
    allAuctions = await listAuctions();

    const radios = document.querySelectorAll('.btn-check');

    radios.forEach(radio => {
        radio.removeEventListener('change', handleRadioChange);
    
        radio.addEventListener('change', handleRadioChange);
    });
    
    function handleRadioChange() {
        const selectedCategory = Array.from(radios)
            .find(radio => radio.checked)
            .value.toLowerCase(); 
    
        const filteredAuctions = allAuctions.filter(auction =>
            selectedCategory === 'all' ||
            auction.tags.some(tag => selectedCategory === tag.toLowerCase()) 
        );
    
        displayAuctions(filteredAuctions);

        setupOpenDetailsModalEventListener();
    }

    displayAuctions(allAuctions);
}