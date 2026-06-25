import axios from 'axios';
import { API_BASE_URL, API_USERNAME, API_PASSWORD } from '../utils/constants';

const createBasicAuthToken = () => {
  return btoa(`${API_USERNAME}:${API_PASSWORD}`);
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${createBasicAuthToken()}`
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // You can add additional request logic here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Return just the data part if you prefer, or the whole response
    return response;
  },
  (error) => {
    let errorMessage = 'An unexpected error occurred.';
    let errorType = 'UNKNOWN';

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      
      switch (status) {
        case 401:
          errorMessage = 'Unauthorized. Please check your credentials.';
          errorType = 'UNAUTHORIZED';
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have permission to access this resource.';
          errorType = 'FORBIDDEN';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          errorType = 'NOT_FOUND';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          errorType = 'SERVER_ERROR';
          break;
        default:
          errorMessage = error.response.data?.message || errorMessage;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'Network error. Please check your connection and try again.';
      errorType = 'NETWORK_ERROR';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }

    // Enhance the error object
    const enhancedError = new Error(errorMessage);
    enhancedError.type = errorType;
    enhancedError.originalError = error;

    return Promise.reject(enhancedError);
  }
);

export default api;
