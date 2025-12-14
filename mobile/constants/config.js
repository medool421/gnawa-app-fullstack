export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://192.168.1.2:3030/api' 
    : 'https://your-production-api.com/api',
  TIMEOUT: 10000,
};

export const STORAGE_KEYS = {
  BOOKINGS: '@gnawa_bookings',
  USER_EMAIL: '@gnawa_user_email',
};