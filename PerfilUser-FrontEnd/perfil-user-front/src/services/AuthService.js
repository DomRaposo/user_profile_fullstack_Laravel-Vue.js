import apiService from './ApiService';
import { API_CONFIG } from '@/config/api';


class AuthService {
  /**
   * Fazer login do usuário
   * @param {Object} credentials - Credenciais (email, password)
   * @returns {Promise<Object>} Dados do usuário e token
   */
  async login(credentials) {
    try {

      await this.getCsrfToken();
      
      const response = await apiService.post(API_CONFIG.endpoints.auth.login, credentials);
      
      // Salvar token e dados do usuário
      apiService.setToken(response.token);
      apiService.setUser(response.user);
      
      return {
        success: true,
        user: response.user,
        token: response.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao fazer login'
      };
    }
  }

  /**
   * Registrar novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>} Resultado do registro
   */
  async register(userData) {
    try {
      const response = await apiService.post(API_CONFIG.endpoints.auth.register, userData);
      
      return {
        success: true,
        message: response.message,
        user: response.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao registrar usuário'
      };
    }
  }

  /**
   * Fazer logout do usuário
   * @returns {Promise<Object>} Resultado do logout
   */
  async logout() {
    try {

      await apiService.post(API_CONFIG.endpoints.auth.logout);
      

      apiService.clearAuthData();
      
      return {
        success: true,
        message: 'Logout realizado com sucesso'
      };
    } catch (error) {
      // Mesmo com erro, limpar dados locais
      apiService.clearAuthData();
      
      return {
        success: true,
        message: 'Logout realizado com sucesso'
      };
    }
  }

  /**
   * Obter token CSRF do Laravel
   * @returns {Promise<string>} Token CSRF
   */
  async getCsrfToken() {
    try {
      const response = await apiService.get(API_CONFIG.endpoints.auth.csrf);
      return response.csrf_token;
    } catch (error) {
      console.warn('Erro ao obter token CSRF:', error);
      return null;
    }
  }

  /**
   * Verificar se usuário está autenticado
   * @returns {boolean} Status de autenticação
   */
  isAuthenticated() {
    return apiService.isAuthenticated();
  }

  /**
   * Obter dados do usuário atual
   * @returns {Object|null} Dados do usuário
   */
  getCurrentUser() {
    return apiService.getUser();
  }

  /**
   * Obter token de autenticação
   * @returns {string|null} Token JWT
   */
  getToken() {
    return apiService.getToken();
  }
}

// Instância singleton
const authService = new AuthService();
export default authService; 