/**
 * Exportação centralizada de todos os services - Laravel Backend
 */
import ApiService from './ApiService';
import AuthService from './AuthService';
import UserService from './UserService';


export {
  ApiService,
  AuthService,
  UserService
};


export default {
  ApiService,
  AuthService,
  UserService
};


export { API_CONFIG, ENV_CONFIG, ConfigUtils } from '@/config/api'; 