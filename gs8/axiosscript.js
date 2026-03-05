/**
 * Axios Tutorial - GS8
 * Topic: Fetch and Display Random Images (Dog API)
 * 
 * Demonstrates fetching binary data (images) using Axios
 */

// Event listener for button click
document.getElementById("btn").addEventListener("click", makerequest);

/**
 * Fetches a random dog image from the Dog CEO API
 * Uses async/await with proper response handling
 */
async function makerequest() {
  console.log("Button Clicked - Fetching random dog image...");
  
  // Show loading state
  const imageElement = document.getElementById("image");
  const statusElement = document.getElementById("status");
  
  imageElement.style.display = 'none';
  imageElement.src = '';
  statusElement.innerHTML = '<span class="loading">Loading...</span>';
  
  try {
    // Make the request to Dog CEO API
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    
    // Log the response
    console.log('Full Response:', response);
    console.log('Response Data:', response.data);
    console.log('Image URL:', response.data.message);
    console.log('Status:', response.data.status);
    
    // Check if the request was successful
    if (response.data.status === 'success') {
      // Display the image
      imageElement.src = response.data.message;
      imageElement.style.display = 'block';
      
      statusElement.innerHTML = `
        <span class="success">✓ Image loaded successfully!</span>
        <div class="label">Status:</div>
        <div class="value">${response.data.status}</div>
      `;
      
      console.log('Image src set to:', response.data.message);
    } else {
      throw new Error('Failed to fetch image');
    }
    
  } catch (error) {
    handleError(error);
  }
}

/**
 * Alternative: Using Promise .then() syntax
 * Uncomment to use this approach instead
 */
// function makerequest() {
//   console.log("Button Clicked - Fetching random dog image...");
//   
//   const imageElement = document.getElementById("image");
//   const statusElement = document.getElementById("status");
//   
//   imageElement.style.display = 'none';
//   statusElement.innerHTML = '<span class="loading">Loading...</span>';
//   
//   axios.get('https://dog.ceo/api/breeds/image/random')
//     .then((response) => {
//       console.log('Response Data:', response.data);
//       
//       if (response.data.status === 'success') {
//         imageElement.src = response.data.message;
//         imageElement.style.display = 'block';
//         
//         statusElement.innerHTML = `
//           <span class="success">✓ Image loaded successfully!</span>
//           <div class="label">Status:</div>
//           <div class="value">${response.data.status}</div>
//         `;
//       }
//     })
//     .catch((error) => {
//       handleError(error);
//     });
// }

/**
 * Alternative: Using specific breed
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Fetching dog image by breed...");
//   
//   const imageElement = document.getElementById("image");
//   const statusElement = document.getElementById("status");
//   
//   imageElement.style.display = 'none';
//   statusElement.innerHTML = '<span class="loading">Loading...</span>';
//   
//   try {
//     // Fetch a specific breed (e.g., labrador)
//     const response = await axios.get('https://dog.ceo/api/breeds/image/random');
//     
//     if (response.data.status === 'success') {
//       imageElement.src = response.data.message;
//       imageElement.style.display = 'block';
//       statusElement.innerHTML = '<span class="success">✓ Success!</span>';
//     }
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Using timeout and abort controller
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Fetching with timeout...");
//   
//   const imageElement = document.getElementById("image");
//   const statusElement = document.getElementById("status");
//   
//   imageElement.style.display = 'none';
//   statusElement.innerHTML = '<span class="loading">Loading...</span>';
//   
//   // Create abort controller for timeout
//   const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), 5000);
//   
//   try {
//     const response = await axios.get('https://dog.ceo/api/breeds/image/random', {
//       signal: controller.signal
//     });
//     
//     clearTimeout(timeoutId);
//     
//     if (response.data.status === 'success') {
//       imageElement.src = response.data.message;
//       imageElement.style.display = 'block';
//       statusElement.innerHTML = '<span class="success">✓ Success!</span>';
//     }
//   } catch (error) {
//     clearTimeout(timeoutId);
//     handleError(error);
//   }
// }

/**
 * Error handling utility function
 * @param {Error} error - The Axios error object
 */
function handleError(error) {
  const imageElement = document.getElementById("image");
  const statusElement = document.getElementById("status");
  
  imageElement.style.display = 'none';
  
  if (error.response) {
    console.error('Server Error:', error.response.status);
    statusElement.innerHTML = `
      <span class="error">✗ Server Error</span>
      <div class="value">Status: ${error.response.status}</div>
    `;
  } else if (error.request) {
    console.error('Network Error:', error.message);
    statusElement.innerHTML = `
      <span class="error">✗ Network Error</span>
      <div class="value">Could not connect to server</div>
    `;
  } else if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') {
    console.error('Request canceled:', error.message);
    statusElement.innerHTML = `
      <span class="error">✗ Request Timeout</span>
      <div class="value">The request took too long</div>
    `;
  } else {
    console.error('Error:', error.message);
    statusElement.innerHTML = `
      <span class="error">✗ Error</span>
      <div class="value">${error.message}</div>
    `;
  }
}

