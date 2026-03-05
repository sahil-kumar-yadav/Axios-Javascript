/**
 * Axios Tutorial - GS1
 * Topic: Basic GET Request - Fetch Data from Text File
 */

// Event listener for button click
document.getElementById("btn").addEventListener("click", makerequest);

/**
 * Makes a GET request to fetch text data using async/await
 * This is the modern and recommended approach for Axios requests
 */
async function makerequest() {
  console.log("Button Clicked - Starting request...");
  
  try {
    // Using axios.get() shorthand method
    const response = await axios.get('data.txt');
    
    // Axios automatically parses the response
    console.log('Full Response:', response);
    console.log('Response Data:', response.data);
    
    // Display the data in the browser
    document.getElementById("divdata").innerText = response.data;
    
  } catch (error) {
    // Comprehensive error handling
    handleError(error);
  }
}

/**
 * Alternative: Using axios() with config object
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Starting request...");
//   
//   try {
//     const config = {
//       method: 'get',
//       url: 'data.txt'
//     };
//     
//     const response = await axios(config);
//     console.log('Response Data:', response.data);
//     document.getElementById("divdata").innerText = response.data;
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Using axios() shorthand (method defaults to GET)
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Starting request...");
//   
//   try {
//     const response = await axios('data.txt');
//     console.log('Response Data:', response.data);
//     document.getElementById("divdata").innerText = response.data;
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Using Promise .then() syntax
 * Uncomment to use this approach instead
 */
// function makerequest() {
//   console.log("Button Clicked - Starting request...");
//   
//   axios.get('data.txt')
//     .then((response) => {
//       console.log('Response Data:', response.data);
//       document.getElementById("divdata").innerText = response.data;
//     })
//     .catch((error) => {
//       handleError(error);
//     })
//     .finally(() => {
//       console.log("Request completed");
//     });
// }

/**
 * Error handling utility function
 * @param {Error} error - The Axios error object
 */
function handleError(error) {
  if (error.response) {
    // Server responded with error status
    console.error('Server Error:', error.response.status);
    console.error('Error Message:', error.response.statusText);
    document.getElementById("divdata").innerText = `Error: ${error.response.status} - ${error.response.statusText}`;
  } else if (error.request) {
    // Request made but no response received
    console.error('Network Error:', error.message);
    document.getElementById("divdata").innerText = "Error: No response from server";
  } else {
    // Something else went wrong
    console.error('Error:', error.message);
    document.getElementById("divdata").innerText = `Error: ${error.message}`;
  }
}

