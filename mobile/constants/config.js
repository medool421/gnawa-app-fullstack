export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://192.168.1.17:3030/api' 
    : 'https://your-production-api.com/api',
  TIMEOUT: 10000,
};
