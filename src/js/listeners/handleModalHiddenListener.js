// handleModalHiddenListener.js
/**
 * Handles the 'hidden.bs.modal' event for the modal element.
 *
 * @param {HTMLElement} modalElement - The modal element.
 * @param {HTMLElement} modalEnds - The element displaying the end time of the auction.
 */
export function handleModalHidden(modalElement, modalEnds) {
    modalElement.addEventListener('hidden.bs.modal', function () {
        if (modalEnds.intervalId) {
            clearInterval(modalEnds.intervalId);
        }
        modalEnds.textContent = '';

        const bidHistoryDiv = document.getElementById('bidHistory');
        if (bidHistoryDiv) {
            bidHistoryDiv.innerHTML = '';
        }

        const responseMessage = document.getElementById("responseMessage");
        if (responseMessage) {
            responseMessage.textContent = '';
        }
    });
}