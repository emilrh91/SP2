import { loginUserAccount } from '../api/auth/login.js';
import { saveToLocalStorage } from '../storage/storageHandler.js';

/**
 * Adds an event listener to the login form.
 */
export function LoginUserEventListener() {
    const form = document.getElementById('loginForm');
    if (!form) return; 

    const feedbackMessage = document.getElementById('feedbackMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userEmail = document.getElementById('userEmail').value;
        const userPassword = document.getElementById('userPassword').value;

        const result = await loginUserAccount(userEmail, userPassword);
        
        if (result.error) {
            feedbackMessage.className = 'alert alert-danger';
            feedbackMessage.textContent = result.error;
            feedbackMessage.style.display = 'block';
        } else {
            saveToLocalStorage('userToken', result.token); 
            saveToLocalStorage('userName', result.name); 
            saveToLocalStorage('userEmail', userEmail);
            saveToLocalStorage('userId', result.id);

            feedbackMessage.className = 'alert alert-success';
            feedbackMessage.textContent = 'Logged in! redirecting to home';
            feedbackMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = '/'; 
            }, 2000);
        }
    });
}