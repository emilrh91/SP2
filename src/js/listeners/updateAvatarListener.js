import { updateAvatar } from '../api/profile/updateAvatar.js';

/**
 * Sets up the event listener for updating the avatar.
 *
 * @param {string} userName - The user's name.
 */
export function updateAvatarListener(userName) {
    document.getElementById('updateAvatarButton').addEventListener('click', () => {
        const avatarUrl = prompt("Please enter the new avatar URL:");
        updateAvatar(userName, avatarUrl)
            .then(newAvatarUrl => {
                document.getElementById('avatar').src = newAvatarUrl;
            })
            .catch(error => {
                document.getElementById('error').textContent = 'Error: ' + error.message;
            });
    });
};