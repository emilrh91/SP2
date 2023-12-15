import { createUserAccount } from "../api/auth/createUserAccount.js";
import { saveToLocalStorage } from '../storage/storageHandler.js';

/**
 * Sets up the event listener for the registration form.
 */
export function setUpRegistrationFormEventListener() {
    const form = document.getElementById('registrationForm');
    if (!form) return; 

    const feedbackMessage = document.getElementById('feedbackMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const userEmail = document.getElementById('userEmail').value;
        const userPassword = document.getElementById('userPassword').value;
        const userAvatar = document.getElementById('userAvatar').value;
    
        try {
            const result = await createUserAccount(username, userEmail, userPassword, userAvatar);
            
            saveToLocalStorage('userToken', result.token); 
            saveToLocalStorage('userName', username); 
            saveToLocalStorage('userEmail', userEmail);
    
            feedbackMessage.className = 'alert alert-success';
            feedbackMessage.textContent = 'Account Created! redirecting to home';
            feedbackMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = '/'; 
            }, 2000);
        } catch (error) {
            feedbackMessage.className = 'alert alert-danger';
            feedbackMessage.textContent = error.message;
            feedbackMessage.style.display = 'block';
        }
    });
}