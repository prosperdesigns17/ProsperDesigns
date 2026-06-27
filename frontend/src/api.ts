import axios from 'axios';

const envUrl = import.meta.env.VITE_API_URL || 'https://prosper-designs-vqzf-hvtyd3jh4-prosperdesign.vercel.app';
const cleanUrl = envUrl.replace(/\/api\/?$/, '').replace(/\/$/, '');
const API_BASE_URL = `${cleanUrl}/api`;

const API = axios.create({ 
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
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
  return cleanUrl;
};

export default API;
