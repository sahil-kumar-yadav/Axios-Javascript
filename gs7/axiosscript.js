/**
 * Axios Tutorial - GS7
 * Topic: Create Axios Instance
 * 
 * Creating a reusable Axios instance with custom configuration
 */

// Event listener for button click
document.getElementById("btn").addEventListener("click", makerequest);

/**
 * Create a custom Axios instance
 * 
 * An Axios instance is a pre-configured version of Axios that you can reuse
 * for making API calls to a specific base URL with consistent configuration.
 */

// Create axios instance with custom configuration
const api = axios.create({
  // Base URL for all requests made with this instance
  baseURL: 'https://jsonplaceholder.typicode.com',
  
  // Default timeout (5 seconds)
  timeout: 5000,
  
  // Default headers
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Add request interceptor to this instance
api.interceptors.request.use(
  config => {
    // Add auth token to requests made with this instance
    // In production, get the token from your auth system
    // config.headers.Authorization = 'Bearer your-token-here';
    console.log('Request made to:', config.url);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor to this instance
api.interceptors.response.use(
  response => {
    // Process response before returning
    console.log('Response received from:', response.config.url);
    return response;
  },
  error => {
    // Handle errors globally for this instance
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

/**
 * Makes a GET request using the custom Axios instance
 * The instance's configuration is automatically applied
 */
async function makerequest() {
  console.log("Button Clicked - Making request with custom instance...");
  
  try {
    // Using the custom instance (note: we only need the path now)
    const response = await api.get('/posts/1');
    
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
      <div class="info">Used custom Axios instance with baseURL</div>
      <div class="label">Post ID:</div>
      <div class="value">${response.data.id}</div>
      <div class="label">Title:</div>
      <div class="value">${response.data.title}</div>
      <div class="label">Body:</div>
      <div class="value">${response.data.body}</div>
    `;
    
  } catch (error) {
    handleError(error);
  }
}

/**
 * Alternative: Fetch multiple posts using the instance
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Fetching all posts...");
//   
//   try {
//     const response = await api.get('/posts');
//     
//     console.log('Number of posts:', response.data.length);
//     
//     // Display posts in browser
//     const output = document.getElementById("result");
//     let html = '<div class="success">✓ Posts loaded!</div>';
//     
//     // Show first 5 posts
//     response.data.slice(0, 5).forEach(post => {
//       html += `
//         <div class="post">
//           <div class="post-id">ID: ${post.id}</div>
//           <div class="post-title">${post.title}</div>
//         </div>
//       `;
//     });
//     
//     output.innerHTML = html;
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Making a POST request with the instance
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Creating new post...");
//   
//   try {
//     const response = await api.post('/posts', {
//       title: 'My New Post',
//       body: 'This is the content of my new post',
//       userId: 1
//     });
//     
//     console.log('Created post:', response.data);
//     
//     const output = document.getElementById("result");
//     output.innerHTML = `
//       <div class="success">✓ Post created!</div>
//       <div class="label">ID:</div>
//       <div class="value">${response.data.id}</div>
//     `;
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Shorthand syntax with instance
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   try {
//     // You can also use shorthand methods
//     const response = await api('/posts/1');
//     console.log('Response Data:', response.data);
//     
//     const output = document.getElementById("result");
//     output.innerHTML = `
//       <div class="success">✓ Success!</div>
//       <div class="value">Title: ${response.data.title}</div>
//     `;
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
      <div class="label">Timeout:</div>
      <div class="value">${error.message.includes('timeout') ? 'Request timed out' : 'No response from server'}</div>
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

