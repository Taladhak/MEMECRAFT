// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the form with the ID 'generator'
    document.getElementById('generator').addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Validate the form and proceed if valid
        if (validateForm()) {
            // Create the meme and clear the form fields
            createMeme();
            clearForm();
        } else {
            // Alert the user if the form fields are not correctly filled
            alert('Please fill all required fields.');
        }
    });
});

// Function to create and display a new meme
function createMeme() {
    // Create a div that will contain both the image (canvas) and text
    const memeContainer = document.createElement('div');
    memeContainer.className = 'meme';

    // Create a canvas element to draw the image
    const canvas = document.createElement('canvas');
    canvas.width = 500; // The width of the canvas
    canvas.height = 500; // The height of the canvas
    const ctx = canvas.getContext('2d');

    // Add canvas to the meme container
    memeContainer.appendChild(canvas);

    // Create the image element
    const image = new Image();
    // When the image is loaded, draw it on the canvas
    image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    // Load the image from the file input or URL input
    const fileInput = document.getElementById('imageInput');
    const urlInput = document.getElementById('url');
    if (fileInput.files && fileInput.files[0]) {
        // If a file is selected, read the file as a data URL
        const reader = new FileReader();
        reader.onload = (e) => image.src = e.target.result;
        reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput.value.trim() !== '') {
        // If a URL is entered, set it as the source of the image
        image.src = urlInput.value;
    } else {
        // If neither a file nor a URL is provided, alert the user
        alert('Please select an image or enter an image URL.');
        return; // Exit the function
    }

    // Create div elements for the top and bottom text
    const topTextDiv = document.createElement('div');
    topTextDiv.className = 'meme-text top-text';
    topTextDiv.textContent = document.getElementById('topText').value;
    memeContainer.appendChild(topTextDiv);

    const bottomTextDiv = document.createElement('div');
    bottomTextDiv.className = 'meme-text bottom-text';
    bottomTextDiv.textContent = document.getElementById('bottomText').value;
    memeContainer.appendChild(bottomTextDiv);

    // Append the meme container to the meme display area
    document.getElementById('meme').appendChild(memeContainer);

    // Add a delete button to the meme container
    addDeleteButton(memeContainer);
}

// Function to add a delete button to a meme container
function addDeleteButton(memeContainer) {
    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Meme';
    deleteButton.className = 'deleteBtn';
    // Add an event listener to the delete button to remove the meme container
    deleteButton.onclick = function() {
        memeContainer.remove();
    };
    memeContainer.appendChild(deleteButton);
}

// Function to clear the form fields
function clearForm() {
    document.getElementById('url').value = '';
    document.getElementById('imageInput').value = '';
    document.getElementById('topText').value = '';
    document.getElementById('bottomText').value = '';
}

// Function to validate the form fields
function validateForm() {
    const url = document.getElementById('url').value.trim();
    const fileInput = document.getElementById('imageInput').value.trim();
    const topText = document.getElementById('topText').value.trim();
    const bottomText = document.getElementById('bottomText').value.trim();
    // Check that either a file or URL is provided and that both text inputs have values
    return (url !== '' || fileInput !== '') && topText !== '' && bottomText !== '';
}
