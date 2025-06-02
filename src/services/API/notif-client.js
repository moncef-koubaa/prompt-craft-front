import axios from 'axios';
import router from '@/router/index.js';

const baseAxios = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 10000,
});

baseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status && error.response.status === 401) {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
        router.push('/auth/signin');
      }
    }

    return Promise.reject(error);
  }
);

let apiNotifClient = baseAxios;

apiNotifClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiNotifClient;
