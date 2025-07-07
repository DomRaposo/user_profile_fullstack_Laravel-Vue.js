// DEPRECATED: Este arquivo será removido em breve.
// Use AuthService em vez destas funções.
import { AuthService, ApiService } from '@/services';

/**
 * DEPRECATED: Use AuthService.api.getCsrfCookie()
 * @returns {Promise<void>}
 */
export const getCsrfCookie = async () => {
  console.warn('DEPRECATED: Use AuthService.api.getCsrfCookie()');
  return await ApiService.getCsrfCookie();
};

/**
 * DEPRECATED: Use AuthService.isAuthenticated()
 * @returns {Promise<boolean>}
 */
export const isAuthenticated = async () => {
  console.warn('DEPRECATED: Use AuthService.isAuthenticated()');
  return await AuthService.isAuthenticated();
};

/**
 * DEPRECATED: Use AuthService.logout()
 * @returns {Promise<void>}
 */
export const logout = async () => {
  console.warn('DEPRECATED: Use AuthService.logout()');
  return await AuthService.logout();
};

/**
 * DEPRECATED: Use ApiService.setupInterceptors()
 */
export const setupAxiosInterceptors = () => {
  console.warn('DEPRECATED: Interceptors são configurados automaticamente no ApiService');
};

export default {
  getCsrfCookie,
  isAuthenticated,
  logout,
  setupAxiosInterceptors
}; 