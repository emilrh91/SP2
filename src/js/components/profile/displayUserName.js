/**
 * Displays the user's name.
 *
 * @param {string} userName - The name of the user.
 */
export function displayUserName(userName) {
    const userNameElement = document.querySelector('.card-title');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
}