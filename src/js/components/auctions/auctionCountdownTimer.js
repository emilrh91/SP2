/**
 * Sets a countdown timer for an auction.
 *
 * @param {number} endtime - The end time of the auction in milliseconds since the Unix Epoch.
 * @param {HTMLElement} element - The HTML element where the countdown should be displayed.
 */
export function auctionCountdownTimer(endtime, element) {
    if (element.intervalId) {
        clearInterval(element.intervalId);
    }

    function updateCountdown() {
        const now = Date.now();
        const distance = endtime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        element.textContent = `Auction Ends: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(element.intervalId);
            element.textContent = "Auction Ended";
        }
    }

    updateCountdown();

    element.intervalId = setInterval(updateCountdown, 1000);
}