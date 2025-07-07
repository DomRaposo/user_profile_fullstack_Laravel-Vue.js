/**
 * Exportação centralizada de todos os services - Laravel Backend
 */
import ApiService from './ApiService';
import AuthService from './AuthService';
import UserService from './UserService';

// Exportações nomeadas
export {
  ApiService,
  AuthService,
  UserService
};

// Exportação padrão
export default {
  ApiService,
  AuthService,
  UserService
};

// Configuração da API
export { API_CONFIG, ENV_CONFIG, ConfigUtils } from '@/config/api'; 