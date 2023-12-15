/**
 * Adds an event listener to the 'addMedia' button to create multiple media input fields.
 */
export function addMultipleMediaListener() {
  document.getElementById('addMedia').addEventListener('click', function() {
      const mediaInputs = document.getElementById('mediaInputs');
      const newInputDiv = document.createElement('div');
      newInputDiv.className = 'mb-3';
    
      const newInputLabel = document.createElement('label');
      newInputLabel.className = 'form-label';
      newInputLabel.textContent = 'Media URL';
    
      const newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.className = 'form-control';
      newInput.name = 'media';
    
      newInputDiv.appendChild(newInputLabel);
      newInputDiv.appendChild(newInput);
      mediaInputs.appendChild(newInputDiv);
  });
}