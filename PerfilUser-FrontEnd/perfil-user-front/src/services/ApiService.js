import axios from 'axios';
import { API_CONFIG, ConfigUtils } from '@/config/api';


class ApiService {
  constructor() {

    this.api = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers,
      withCredentials: true // Importante para Laravel Sanctum
    });


    this.setupInterceptors();
  }


  setupInterceptors() {

    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `${API_CONFIG.auth.tokenPrefix}${token}`;
        }
        
        ConfigUtils.debugLog('Request enviado:', {
          method: config.method.toUpperCase(),
          url: config.url,
          hasAuth: !!token
        });
        
        return config;
      },
      (error) => {
        ConfigUtils.debugLog('Erro no request interceptor:', error);
        return Promise.reject(error);
      }
    );


    this.api.interceptors.response.use(
      (response) => {
        ConfigUtils.debugLog('Response recebido:', {
          status: response.status,
          url: response.config.url
        });
        return response;
      },
      async (error) => {
        // Verificar se é erro 401 (token expirado)
        if (error.response?.status === 401) {
          this.handleAuthError();
        }

        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Tratamento profissional de erros da API
   * @param {Error} error - Erro da API
   * @returns {Object} Erro formatado
   */
  handleApiError(error) {
    if (!error.response) {
      // Erro de rede
      return {
        type: 'network',
        message: 'Erro de conexão. Verifique sua internet.',
        originalError: error
      };
    }

    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return {
          type: 'validation',
          message: data.message || 'Dados inválidos',
          errors: data.errors || {},
          statusCode: status
        };
        
      case 401:
        return {
          type: 'unauthorized',
          message: data.message || 'Token inválido ou expirado',
          statusCode: status
        };
        
      case 403:
        return {
          type: 'forbidden',
          message: data.message || 'Acesso negado',
          statusCode: status
        };
        
      case 404:
        return {
          type: 'not_found',
          message: data.message || 'Recurso não encontrado',
          statusCode: status
        };
        
      case 409:
        return {
          type: 'conflict',
          message: data.message || 'Conflito de dados',
          statusCode: status
        };
        
      case 422:
        return {
          type: 'validation',
          message: data.message || 'Dados de validação inválidos',
          errors: data.errors || {},
          statusCode: status
        };
        
      case 500:
        return {
          type: 'server_error',
          message: data.message || 'Erro interno do servidor',
          statusCode: status
        };
        
      default:
        return {
          type: 'unknown',
          message: data.message || 'Erro desconhecido',
          statusCode: status
        };
    }
  }

  /**
   * Tratar erro de autenticação
   */
  handleAuthError() {
    ConfigUtils.debugLog('Erro de autenticação detectado');
    this.clearAuthData();
    
    // Redirecionar para login se estiver em uma rota protegida
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }


  async get(url, config = {}) {
    try {
      const response = await this.api.get(url, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await this.api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async patch(url, data = {}, config = {}) {
    try {
      const response = await this.api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }


  getToken() {
    return localStorage.getItem(API_CONFIG.auth.tokenKey);
  }

  setToken(token) {
    if (token) {
      localStorage.setItem(API_CONFIG.auth.tokenKey, token);
    } else {
      localStorage.removeItem(API_CONFIG.auth.tokenKey);
    }
  }

  setUser(user) {
    if (user) {
      localStorage.setItem(API_CONFIG.auth.userKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(API_CONFIG.auth.userKey);
    }
  }

  getUser() {
    const user = localStorage.getItem(API_CONFIG.auth.userKey);
    return user ? JSON.parse(user) : null;
  }

  clearAuthData() {
    localStorage.removeItem(API_CONFIG.auth.tokenKey);
    localStorage.removeItem(API_CONFIG.auth.userKey);
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}


const apiService = new ApiService();
export default apiService; 