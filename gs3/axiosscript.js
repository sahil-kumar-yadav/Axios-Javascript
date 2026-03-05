/**
 * Axios Tutorial - GS3
 * Topic: Fetch Data from Remote API (GET Request)
 */

// Event listener for button click
document.getElementById("btn").addEventListener("click", makerequest);

/**
 * Makes a GET request to fetch single post from JSONPlaceholder API
 * Uses async/await for modern syntax
 */
async function makerequest() {
  console.log("Button Clicked - Fetching data from Remote API...");
  
  try {
    // Fetch single post by ID
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Axios automatically transforms JSON response
    console.log('Full Response:', response);
    console.log('Response Data:', response.data);
    console.log('ID:', response.data.id);
    console.log('Title:', response.data.title);
    console.log('Body:', response.data.body);
    
    // Display the data in the browser
    document.getElementById("pid").innerText = `ID: ${response.data.id}`;
    document.getElementById("title").innerText = `Title: ${response.data.title}`;
    document.getElementById("body").innerText = response.data.body;
    
  } catch (error) {
    handleError(error);
  }
}

/**
 * Alternative: Fetch multiple posts
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Fetching all posts...");
//   
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
//     
//     console.log('Number of posts:', response.data.length);
//     
//     // Display all posts in the browser
//     let output = document.getElementById("allpost");
//     response.data.forEach(post => {
//       output.innerHTML += `
//         <div class="post">
//           <div class="post-id">ID: ${post.id}</div>
//           <div class="post-title">${post.title}</div>
//           <div class="post-body">${post.body}</div>
//         </div>
//         <hr>
//       `;
//     });
//     
//   } catch (error) {
//     handleError(error);
//   }
// }

/**
 * Alternative: Using query parameters to filter results
 * Uncomment to use this approach instead
 */
// async function makerequest() {
//   console.log("Button Clicked - Fetching filtered posts...");
//   
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
//       params: { userId: 1 }  // Filter posts by userId
//     });
//     
//     console.log('Filtered posts:', response.data);
//     
//     let output = document.getElementById("allpost");
//     response.data.forEach(post => {
//       output.innerHTML += `
//         <div class="post">
//           <div class="post-id">ID: ${post.id}</div>
//           <div class="post-title">${post.title}</div>
//         </div>
//         <hr>
//       `;
//     });
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
//   console.log("Button Clicked - Fetching data from Remote API...");
//   
//   axios.get('https://jsonplaceholder.typicode.com/posts/1')
//     .then((response) => {
//       console.log('Response Data:', response.data);
//       document.getElementById("pid").innerText = `ID: ${response.data.id}`;
//       document.getElementById("title").innerText = `Title: ${response.data.title}`;
//       document.getElementById("body").innerText = response.data.body;
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
    document.getElementById("pid").innerText = `Error: ${error.response.status}`;
    document.getElementById("title").innerText = error.response.statusText;
    document.getElementById("body").innerText = "Please try again later";
  } else if (error.request) {
    // Request made but no response received
    console.error('Network Error:', error.message);
    document.getElementById("pid").innerText = "Error";
    document.getElementById("title").innerText = "Network Error";
    document.getElementById("body").innerText = "Could not connect to server";
  } else {
    // Something else went wrong
    console.error('Error:', error.message);
    document.getElementById("pid").innerText = "Error";
    document.getElementById("title").innerText = "Error";
    document.getElementById("body").innerText = error.message;
  }
}

