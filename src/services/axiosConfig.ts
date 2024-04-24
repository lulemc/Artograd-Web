import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 3600,
  paramsSerializer: {
    indexes: null,
  },
});

api.interceptors.request.use((config) => {
  const idToken = localStorage.getItem('id_token');
  config.headers['Authorization'] = `Bearer ${idToken}`;
  return config;
});

export default api;
