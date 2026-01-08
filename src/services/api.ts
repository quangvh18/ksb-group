import axios, { AxiosResponse } from 'axios';
import https from 'https';

// Base API configuration
const api = axios.create({
  baseURL: 'https://admin.ksbgroup.vn/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Allow unauthorized certificates in development to avoid CERT_NOT_YET_VALID or other SSL issues
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers or other common headers here
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      headers: error.config?.headers
    });
    return Promise.reject(error);
  }
);

export default api;
