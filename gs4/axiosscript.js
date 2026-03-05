/**
 * Axios Tutorial - GS4
 * Topic: POST Data to API
 */

// Event listener for button click
document.getElementById("btn").addEventListener("click", makerequest);

/**
 * Makes a POST request to create new data using async/await
 * Sends JSON data to a REST API
 */
async function makerequest() {
  console.log("Button Clicked - Sending POST request...");
  
  try {
    // Prepare the data to send
    const postData = {
      name: "Sonam",
      job: "Web Dev"
    };
    
    // Using axios.post() shorthand method
    const response = await axios.post('https://reqres.in/api/users', postData);
    
    // Log the response
    console.log('Full Response:', response);
    console.log('Response Data:', response.data);
    console.log('Created ID:', response.data.id);
    console.log('Created At:', response.data.createdAt);
    
    // Display the response in the browser
    const output = document.getElementById("result");
    output.innerHTML = `
      <div class="success">✓ Data posted successfully!</div>
      <div class="label">ID:</div>
      <div class="value">${response.data.id}</div>
      <div class="label">Created At:</div>
      <div class="value">${response.data.createdAt}</div>
    `;
    
  } catch (error) {
    handleError(error);
  }
}

/**
 * Alternative: Using axios() with config object
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Sending POST request...");
//   
//   try {
//     const config = {
//       method: 'POST',
//       url: 'https://reqres.in/api/users',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: JSON.stringify({
//         name: "Sonam",
//         job: "Web Dev"
//       })
//     };
//     
//     const response = await axios(config);
//     console.log('Response Data:', response.data);
//     
//     const output = document.getElementById("result");
//     output.innerHTML = `
//       <div class="success">✓ Data posted successfully!</div>
//       <div class="label">ID:</div>
//       <div class="value">${response.data.id}</div>
//     `;
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Using custom headers
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Sending POST request with custom headers...");
//   
//   try {
//     const response = await axios.post(
//       'https://reqres.in/api/users',
//       { name: "Rahul", job: "DevOps" },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer your-token-here'
//         }
//       }
//     );
//     
//     console.log('Response Data:', response.data);
//     
//     const output = document.getElementById("result");
//     output.innerHTML = `
//       <div class="success">✓ Data posted successfully!</div>
//       <div class="value">ID: ${response.data.id}</div>
//     `;
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
//   console.log("Button Clicked - Sending POST request...");
//   
//   axios.post('https://reqres.in/api/users', {
//       name: "Sonam",
//       job: "Web Dev"
//     })
//     .then((response) => {
//       console.log('Response Data:', response.data);
//       const output = document.getElementById("result");
//       output.innerHTML = `
//         <div class="success">✓ Data posted successfully!</div>
//         <div class="value">ID: ${response.data.id}</div>
//       `;
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
  const output = document.getElementById("result");
  
  if (error.response) {
    // Server responded with error status
    console.error('Server Error:', error.response.status);
    output.innerHTML = `
      <div class="error">✗ Server Error</div>
      <div class="label">Status:</div>
      <div class="value">${error.response.status}</div>
      <div class="label">Message:</div>
      <div class="value">${error.response.statusText}</div>
    `;
  } else if (error.request) {
    // Request made but no response received
    console.error('Network Error:', error.message);
    output.innerHTML = `
      <div class="error">✗ Network Error</div>
      <div class="value">Could not connect to server</div>
    `;
  } else {
    // Something else went wrong
    console.error('Error:', error.message);
    output.innerHTML = `
      <div class="error">✗ Error</div>
      <div class="value">${error.message}</div>
    `;
  }
}

