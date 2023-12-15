import { postNewAuction } from "../api/auctions/postAuction.js";
import { validateForm } from "../validation/validateNewAuctionForm.js";

/**
 * Sets up the event listener for the new auction form.
 */
export async function setupNewAuctionFormListener() { 
    const endsAtInput = document.getElementById('endsAt');

    const now = new Date();
    endsAtInput.min = now.toISOString().substring(0, 16);

    const oneYearFromNow = new Date(now.setFullYear(now.getFullYear() + 1));
    endsAtInput.max = oneYearFromNow.toISOString().substring(0, 16);

    document.getElementById('newAuctionForm').addEventListener('submit', async function(event) {
        event.preventDefault();
      
        const form = event.target;
        const formData = new FormData(form);
      
        const errorMessage = validateForm(formData);
        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        const title = formData.get('title');
        const description = formData.get('description');
        const tags = Array.from(document.querySelectorAll('.tag')).map(tag => tag.textContent);
        const media = formData.getAll('media').filter(url => url.trim() !== '');
        const endsAt = formData.get('endsAt');
      
        const newAuction = {
          title,
          description,
          tags,
          media,
          endsAt
        };
      
        const alertMessage = document.querySelector('.alert-message');

        const result = await postNewAuction(newAuction);

        if (result.error) {
            console.error(result.error);
            alertMessage.textContent = result.error;
            alertMessage.className = 'alert alert-danger';
            alertMessage.style.display = 'block';
        } else {
            console.log(result);
            alertMessage.textContent = "Auction created successfully!";
            alertMessage.className = 'alert alert-success';
            alertMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = 'auctions.html';
            }, 2000);
        }
      }); 
    const tagsInput = document.getElementById('tags');
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags-container';
    tagsInput.parentNode.insertBefore(tagsContainer, tagsInput.nextSibling);

    tagsInput.addEventListener('keyup', function(event) {
        if (event.keyCode === 32 || event.keyCode === 13) { 
            const tag = event.target.value.trim();
            if (tag !== '') {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagElement.addEventListener('click', function() {
                    this.parentNode.removeChild(this);
                });
                tagsContainer.appendChild(tagElement);
                event.target.value = '';
            }
        }
    });
  
    tagsInput.addEventListener('blur', function(event) {
        const tag = event.target.value.trim();
        if (tag !== '') {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', function() {
                this.parentNode.removeChild(this);
            });
            tagsContainer.appendChild(tagElement);
            event.target.value = '';
        }
    });
}