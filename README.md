# Axios JavaScript Tutorial

A comprehensive guide to learning Axios HTTP client with practical examples.

> **Video Tutorial**: [Axios Complete Course on YouTube](https://youtu.be/AriyBKPIHkk)

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Examples Overview](#examples-overview)
5. [API Reference](#api-reference)
6. [Best Practices](#best-practices)
7. [Error Handling](#error-handling)

---

## Introduction

Axios is a promise-based HTTP client for the browser and Node.js. It provides an easy-to-use API for making HTTP requests and handles responses automatically.

### Why Axios?

- ✅ Works in both browser and Node.js
- ✅ Automatic JSON data transformation
- ✅ Request and response interceptors
- ✅ Automatic error handling
- ✅ Request cancellation
- ✅ Progress tracking
- ✅ CSRF protection

---

## Installation

### Using npm (Node.js)

```bash
npm install axios
```

### Using yarn

```bash
yarn add axios
```

### Using CDN (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js"></script>
```

---

## Quick Start

### GET Request

```javascript
// Using async/await (Recommended)
async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Using Promises
axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### POST Request

```javascript
async function createUser() {
  try {
    const response = await axios.post('https://api.example.com/users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## Examples Overview

| Folder | Topic | Description |
|--------|-------|-------------|
| [gs1](./gs1/) | Basic GET | Fetch data from a text file |
| [gs2](./gs2/) | JSON Data | Fetch and parse JSON data |
| [gs3](./gs3/) | Remote API | Fetch from REST API (GET) |
| [gs4](./gs4/) | POST Request | Send data to API |
| [gs5](./gs5/) | Form Data | POST form data to API |
| [gs6](./gs6/) | Global Defaults | Set default configuration |
| [gs7](./gs7/) | Axios Instance | Create custom axios instance |
| [gs8](./gs8/) | Image API | Fetch and display random images |

---

## API Reference

### axios(config)

Make a request with custom config:

```javascript
await axios({
  method: 'GET',
  url: 'https://api.example.com/data',
  params: { page: 1 },
  headers: { 'Authorization': 'Bearer token' },
  timeout: 5000
});
```

### axios(url, config)

Shorthand for simple requests:

```javascript
await axios('https://api.example.com/data');
```

### Request Methods

| Method | Description |
|--------|-------------|
| `axios.get(url, config)` | GET request |
| `axios.post(url, data, config)` | POST request |
| `axios.put(url, data, config)` | PUT request |
| `axios.patch(url, data, config)` | PATCH request |
| `axios.delete(url, config)` | DELETE request |
| `axios.head(url, config)` | HEAD request |
| `axios.options(url, config)` | OPTIONS request |

### Config Options

| Option | Type | Description |
|--------|------|-------------|
| `url` | string | Request URL |
| `method` | string | Request method (default: GET) |
| `baseURL` | string | Base URL for requests |
| `headers` | object | Request headers |
| `params` | object | URL query parameters |
| `data` | object | Request body (POST, PUT, PATCH) |
| `timeout` | number | Request timeout in milliseconds |
| `withCredentials` | boolean | Include credentials |
| `auth` | object | Basic auth { username, password } |
| `responseType` | string | Response type (json, text, blob, etc.) |
| `validateStatus` | function | Status code validation function |

---

## Best Practices

### 1. Use async/await

```javascript
// ✅ Recommended
async function getData() {
  const response = await axios.get('/api/data');
  return response.data;
}

// ❌ Avoid (unless necessary)
function getData() {
  return axios.get('/api/data').then(response => response.data);
}
```

### 2. Always Handle Errors

```javascript
async function fetchData() {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      console.error('Server Error:', error.response.status);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Something else went wrong
      console.error('Error:', error.message);
    }
    throw error;
  }
}
```

### 3. Use Interceptors for Common Tasks

```javascript
// Request interceptor
axios.interceptors.request.use(
  config => {
    // Add auth token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

### 4. Use Axios Instances for API Groups

```javascript
// Create API instance
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Use for related endpoints
const users = await api.get('/users');
const posts = await api.get('/posts');
```

### 5. Cancel Unnecessary Requests

```javascript
const controller = new AbortController();

// Make request with cancellation
axios.get('/api/data', { signal: controller.signal })
  .then(response => console.log(response.data))
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled');
    }
  });

// Cancel request when needed
controller.abort();
```

---

## Error Handling

### Understanding Axios Errors

```javascript
try {
  await axios.get('/api/data');
} catch (error) {
  // Error type checking
  if (error.response) {
    // The server responded with a status code outside 2xx
    console.log(error.response.data);    // Error message from server
    console.log(error.response.status);  // HTTP status code
    console.log(error.response.headers); // Response headers
  } else if (error.request) {
    // The request was made but no response received
    console.log(error.request);
  } else {
    // Something else caused the error
    console.log('Error', error.message);
  }
  
  // Check for specific status codes
  if (error.response?.status === 404) {
    console.log('Resource not found');
  }
}
```

### Custom Error Handling Utility

```javascript
async function handleRequest(promise) {
  try {
    const response = await promise;
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
}

// Usage
const result = await handleRequest(axios.get('/api/data'));
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

---

## Running the Examples

1. Open any `gsX/index.html` file in a web browser
2. Click the button to see the Axios request in action
3. Open browser console (F12) to see detailed logs

> **Note**: Some examples require a local server to fetch text/JSON files. Use a simple HTTP server:
> ```bash
> npx http-server
> ```

---

## Resources

- [Official Axios Documentation](https://axios-http.com/)
- [npm Package](https://www.npmjs.com/package/axios)
- [GitHub Repository](https://github.com/axios/axios)

---

## License

MIT License

