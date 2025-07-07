/**
 * Configuração centralizada da API - Laravel Backend
 */


const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test'
};


const currentEnv = process.env.NODE_ENV || ENV.DEVELOPMENT;


const environmentConfig = {
  [ENV.DEVELOPMENT]: {
    baseURL: 'http://localhost:8000/api',
    apiURL: 'http://localhost:8000',
    timeout: 10000,
    retryAttempts: 3,
    retryDelay: 1000,
    debug: true
  },
  [ENV.PRODUCTION]: {
    baseURL: process.env.VUE_APP_API_BASE_URL || 'https://api.perfiluser.com/api',
    apiURL: process.env.VUE_APP_API_URL || 'https://api.perfiluser.com',
    timeout: 15000,
    retryAttempts: 3,
    retryDelay: 1500,
    debug: false
  },
  [ENV.TEST]: {
    baseURL: 'http://localhost:8000/api',
    apiURL: 'http://localhost:8000',
    timeout: 5000,
    retryAttempts: 1,
    retryDelay: 500,
    debug: true
  }
};


const activeConfig = environmentConfig[currentEnv];


 /* Configuração principal da API
 */
export const API_CONFIG = {
  // URLs base
  baseURL: activeConfig.baseURL,
  apiURL: activeConfig.apiURL,
  

  timeout: activeConfig.timeout,
  retryAttempts: activeConfig.retryAttempts,
  retryDelay: activeConfig.retryDelay,
  

  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  

  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    userKey: 'auth_user',
    tokenPrefix: 'Bearer '
  },
  

  debug: activeConfig.debug,
  

  endpoints: {

    auth: {
      login: '/login',
      register: '/users', // POST para criar usuário
      logout: '/logout',
      csrf: '/csrf-token'
    },
    

    users: {
      list: '/users',
      create: '/users',
      show: '/users/:id',
      update: '/users/:id',
      delete: '/users/:id'
    }
  }
};

/**
 * Configuração do ambiente
 */
export const ENV_CONFIG = {
  current: currentEnv,
  isDevelopment: currentEnv === ENV.DEVELOPMENT,
  isProduction: currentEnv === ENV.PRODUCTION,
  isTest: currentEnv === ENV.TEST
};

/**
 * Utilitários de configuração
 */
export const ConfigUtils = {
  /**
   * Construir URL completa para endpoint
   * @param {string} endpoint - Endpoint da API
   * @returns {string} URL completa
   */
  buildEndpointUrl(endpoint) {
    return `${API_CONFIG.baseURL}${endpoint}`;
  },
  
  /**
   * Substituir parâmetros em URL
   * @param {string} url - URL com parâmetros
   * @param {Object} params - Parâmetros para substituição
   * @returns {string} URL com parâmetros substituídos
   */
  replaceUrlParams(url, params = {}) {
    let finalUrl = url;
    Object.keys(params).forEach(key => {
      finalUrl = finalUrl.replace(`:${key}`, params[key]);
    });
    return finalUrl;
  },
  
  /**
   * Log de debug (apenas em desenvolvimento)
   * @param {string} message - Mensagem de debug
   * @param {any} data - Dados para log
   */
  debugLog(message, data = null) {
    if (API_CONFIG.debug) {
      console.log(`[API DEBUG] ${message}`, data ? data : '');
    }
  }
};

export default API_CONFIG; 