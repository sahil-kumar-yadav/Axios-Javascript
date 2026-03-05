/**
 * Axios Tutorial - GS2
 * Topic: Fetch Data from JSON File
 */

// Event listener for button click
document.getElementById("btn").addEventListener("click", makerequest);

/**
 * Makes a GET request to fetch JSON data using async/await
 * Axios automatically parses JSON responses
 */
async function makerequest() {
  console.log("Button Clicked - Fetching JSON data...");
  
  try {
    // Using axios.get() shorthand method
    const response = await axios.get('data.json');
    
    // Axios automatically transforms JSON response to JavaScript object
    console.log('Full Response:', response);
    console.log('Response Data:', response.data);
    console.log('Name:', response.data.name);
    console.log('Roll:', response.data.roll);
    
    // Display the data in the browser
    document.getElementById("divdata1").innerText = response.data.name;
    document.getElementById("divdata2").innerText = response.data.roll;
    
  } catch (error) {
    // Comprehensive error handling
    handleError(error);
  }
}

/**
 * Alternative: Using async/await with error handling for display
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Fetching JSON data...");
//   
//   try {
//     const response = await axios.get('data.json');
//     const { name, roll } = response.data;
//     
//     console.log('Name:', name);
//     console.log('Roll:', roll);
//     
//     // Display data in browser
//     document.getElementById("divdata1").innerText = name;
//     document.getElementById("divdata2").innerText = roll;
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
//   console.log("Button Clicked - Fetching JSON data...");
//   
//   axios.get('data.json')
//     .then((response) => {
//       const { name, roll } = response.data;
//       console.log('Name:', name);
//       console.log('Roll:', roll);
//       
//       document.getElementById("divdata1").innerText = name;
//       document.getElementById("divdata2").innerText = roll;
//     })
//     .catch((error) => {
//       handleError(error);
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
    document.getElementById("divdata1").innerText = `Error: ${error.response.status}`;
    document.getElementById("divdata2").innerText = error.response.statusText;
  } else if (error.request) {
    // Request made but no response received
    console.error('Network Error:', error.message);
    document.getElementById("divdata1").innerText = "Error";
    document.getElementById("divdata2").innerText = "No response from server";
  } else {
    // Something else went wrong
    console.error('Error:', error.message);
    document.getElementById("divdata1").innerText = "Error";
    document.getElementById("divdata2").innerText = error.message;
  }
}

