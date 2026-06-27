import axios from 'axios';
import axiosRetry from 'axios-retry';

let rawUrl = import.meta.env.VITE_API_URL || 'https://prosper-designs-vqzf-hvtyd3jh4-prosperdesign.vercel.app/api';
if (!rawUrl.endsWith('/api') && !rawUrl.endsWith('/api/')) {
  rawUrl = rawUrl.replace(/\/$/, '') + '/api';
}

const API_BASE_URL = rawUrl;

const API = axios.create({ 
  baseURL: API_BASE_URL,
  withCredentials: true 
});

// Add retry support for failed requests (e.g. transient network errors)
axiosRetry(API, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response?.status ?? 0) >= 500;
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname.startsWith('/admin')
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const getBackendUrl = () => {
  return API_BASE_URL.replace(/\/api$/, '');
};

export default API;

