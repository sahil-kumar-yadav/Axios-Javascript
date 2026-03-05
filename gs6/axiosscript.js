/**
 * Axios Tutorial - GS6
 * Topic: Global Axios Defaults
 * 
 * Setting default configuration for all Axios requests
 */

// Event listener for button click
document.getElementById("btn").addEventListener("click", makerequest);

/**
 * Global Axios Defaults Configuration
 * These settings apply to all Axios requests made in the application
 */

// Set a default Authorization header for all requests
// Note: In production, get the token from your auth system
axios.defaults.headers.common['Authorization'] = 'Bearer your-auth-token-here';

// Set default base URL (useful when calling the same API repeatedly)
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// Set default timeout (5 seconds)
// axios.defaults.timeout = 5000;

// Set default headers for POST requests
// axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Makes a GET request using async/await
 * The global defaults will be applied automatically
 */
async function makerequest() {
  console.log("Button Clicked - Making request with global defaults...");
  
  try {
    // Using axios.get() - global defaults are automatically applied
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Log the response
    console.log('Full Response:', response);
    console.log('Response Data:', response.data);
    console.log('ID:', response.data.id);
    console.log('Title:', response.data.title);
    console.log('Body:', response.data.body);
    
    // Display the response in the browser
    const output = document.getElementById("result");
    output.innerHTML = `
      <div class="success">✓ Request successful!</div>
      <div class="label">Note:</div>
      <div class="value">This request used global defaults (Authorization header set)</div>
      <div class="label">Post ID:</div>
      <div class="value">${response.data.id}</div>
      <div class="label">Title:</div>
      <div class="value">${response.data.title}</div>
    `;
    
  } catch (error) {
    handleError(error);
  }
}

/**
 * Alternative: Making a POST request with global defaults
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Making POST request with global defaults...");
//   
//   try {
//     const response = await axios.post('https://reqres.in/api/users', {
//       name: "Sonam",
//       job: "Web Dev"
//     });
//     
//     console.log('Response Data:', response.data);
//     
//     const output = document.getElementById("result");
//     output.innerHTML = `
//       <div class="success">✓ POST request successful!</div>
//       <div class="label">ID:</div>
//       <div class="value">${response.data.id}</div>
//     `;
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Using custom config that overrides defaults
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Making request with custom config...");
//   
//   try {
//     // This will override the global Authorization header
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1', {
//       headers: {
//         'Authorization': 'Different-token'
//       }
//     });
//     
//     console.log('Response Data:', response.data);
//     
//     const output = document.getElementById("result");
//     output.innerHTML = `
//       <div class="success">✓ Request successful!</div>
//       <div class="value">Used custom Authorization header</div>
//     `;
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Error handling utility function
 * @param {Error} error - The Axios error object
 */
function handleError(error) {
  const output = document.getElementById("result");
  
  if (error.response) {
    console.error('Server Error:', error.response.status);
    output.innerHTML = `
      <div class="error">✗ Server Error</div>
      <div class="value">Status: ${error.response.status}</div>
    `;
  } else if (error.request) {
    console.error('Network Error:', error.message);
    output.innerHTML = `
      <div class="error">✗ Network Error</div>
      <div class="value">Could not connect to server</div>
    `;
  } else {
    console.error('Error:', error.message);
    output.innerHTML = `
      <div class="error">✗ Error</div>
      <div class="value">${error.message}</div>
    `;
  }
}

