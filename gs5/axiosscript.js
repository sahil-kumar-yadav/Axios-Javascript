/**
 * Axios Tutorial - GS5
 * Topic: POST Form Data to API
 */

// Event listener for button click
document.getElementById("btn").addEventListener("click", makerequest);

/**
 * Makes a POST request with form data using async/await
 * Reads values from form inputs and sends to API
 */
async function makerequest(event) {
  // Prevent form submission if it's a form element
  if (event) event.preventDefault();
  
  console.log("Button Clicked - Sending Form Data...");
  
  // Get values from form inputs
  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;
  
  // Validate inputs
  if (!name || !job) {
    showResult(false, "Please fill in all fields");
    return;
  }
  
  try {
    // Prepare the form data
    const formData = {
      name: name,
      job: job
    };
    
    console.log('Sending data:', formData);
    
    // Using axios.post() shorthand method
    const response = await axios.post('https://reqres.in/api/users', formData);
    
    // Log the response
    console.log('Full Response:', response);
    console.log('Response Data:', response.data);
    console.log('Created ID:', response.data.id);
    console.log('Created At:', response.data.createdAt);
    
    // Display success message
    showResult(true, response.data);
    
  } catch (error) {
    handleError(error);
  }
}

/**
 * Alternative: Using axios() with config object
 * Uncomment to use this approach instead
 */
// async function makerequest(event) {
//   if (event) event.preventDefault();
//   
//   const name = document.getElementById("name").value;
//   const job = document.getElementById("job").value;
//   
//   try {
//     const config = {
//       method: 'POST',
//       url: 'https://reqres.in/api/users',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: JSON.stringify({ name: name, job: job })
//     };
//     
//     const response = await axios(config);
//     showResult(true, response.data);
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Using Promise .then() syntax
 * Uncomment to use this approach instead
 */
// function makerequest(event) {
//   if (event) event.preventDefault();
//   
//   const name = document.getElementById("name").value;
//   const job = document.getElementById("job").value;
//   
//   axios.post('https://reqres.in/api/users', { name: name, job: job })
//     .then((response) => {
//       console.log('Response Data:', response.data);
//       showResult(true, response.data);
//     })
//     .catch((error) => {
//       handleError(error);
//     });
// }

/**
 * Alternative: Using FormData object for file uploads
 * Uncomment to use this approach instead
 */
// async function makerequest(event) {
//   if (event) event.preventDefault();
//   
//   const formElement = document.querySelector('form');
//   const formData = new FormData(formElement);
//   
//   try {
//     const response = await axios.post('https://reqres.in/api/users', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     
//     showResult(true, response.data);
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Display result in the browser
 * @param {boolean} success - Whether the request was successful
 * @param {Object} data - Response data or error message
 */
function showResult(success, data) {
  const output = document.getElementById("result");
  
  if (success) {
    output.innerHTML = `
      <div class="success">✓ Form submitted successfully!</div>
      <div class="label">ID:</div>
      <div class="value">${data.id}</div>
      <div class="label">Name:</div>
      <div class="value">${data.name}</div>
      <div class="label">Job:</div>
      <div class="value">${data.job}</div>
      <div class="label">Created At:</div>
      <div class="value">${data.createdAt}</div>
    `;
  } else {
    output.innerHTML = `
      <div class="error">✗ Error</div>
      <div class="value">${data}</div>
    `;
  }
}

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

