export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://stock-portfolio-backend-production.up.railway.app:8080/api',
  mockDelay: 500,
  mockEnabled: false // Toggle between mock and real API
};