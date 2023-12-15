import { showDetailsModal } from '../views/showDetailsModal.js';

/**
 * Sets up the event listener for opening the details modal.
 */
export function setupOpenDetailsModalEventListener() {
    const auctionElements = document.querySelectorAll('.col-sm-12.col-md-6.col-lg-4.mb-4');

    auctionElements.forEach(auctionElement => {
        const newEventListener = (event) => {
            const auctionId = event.target.closest('.col-sm-12.col-md-6.col-lg-4.mb-4').dataset.id;
            showDetailsModal(auctionId);
        };

        const oldEventListener = auctionElement.getAttribute('data-event-listener');
        if (oldEventListener) {
            auctionElement.removeEventListener('click', oldEventListener);
        }

        auctionElement.addEventListener('click', newEventListener);

        auctionElement.setAttribute('data-event-listener', newEventListener);
    });
}