import axios from 'axios';

const BASE_URL = 'https://apit1.web2.anasource.com/'; // Replace with your API base URL

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Specify a timeout for requests if needed
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    // Perform any modifications to the request config here
    // For example, you can add headers or authentication tokens
    // before sending the request
    return config;
  },
  (error) => {
    // Handle any request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => {
    // Process successful responses here
    // For example, you can handle common success/error codes or
    // perform any necessary data transformations before returning the response
    return response;
  },
  (error) => {
    console.log(error)
    // Handle any response errors here
    // For example, you can handle specific error codes or
    // perform any necessary error transformations before rejecting the promise
    return Promise.reject(error);
  }
);

export default http;
