export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  mockDelay: 500,
  mockEnabled: true // Toggle between mock and real API
};