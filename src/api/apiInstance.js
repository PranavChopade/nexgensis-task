import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

// adding token to every request if available
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken') || '';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// centralised error response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'something went wrong';
    const normalized = new Error(message);
    normalized.status = status;
    normalized.NotFound = status === 404;
    return Promise.reject(normalized);
  },
);

export default api;
