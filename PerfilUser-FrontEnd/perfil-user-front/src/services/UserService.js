import apiService from './ApiService';
import { API_CONFIG } from '@/config/api';

/**
 * Service de usuários - Laravel Backend
 */
class UserService {
  /**
   * Obter lista de todos os usuários
   * @returns {Promise<Array>} Lista de usuários
   */
  async getAllUsers() {
    try {
      const users = await apiService.get(API_CONFIG.endpoints.users.list);
      return {
        success: true,
        data: users
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao buscar usuários'
      };
    }
  }

  /**
   * Obter usuário por ID
   * @param {number} id - ID do usuário
   * @returns {Promise<Object>} Dados do usuário
   */
  async getUserById(id) {
    try {
      const url = API_CONFIG.endpoints.users.show.replace(':id', id);
      const user = await apiService.get(url);
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao buscar usuário'
      };
    }
  }

  /**
   * Criar novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Promise<Object>} Usuário criado
   */
  async createUser(userData) {
    try {
      const user = await apiService.post(API_CONFIG.endpoints.users.create, userData);
      return {
        success: true,
        data: user,
        message: 'Usuário criado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao criar usuário'
      };
    }
  }

  /**
   * Atualizar usuário
   * @param {number} id - ID do usuário
   * @param {Object} userData - Dados para atualizar
   * @returns {Promise<Object>} Usuário atualizado
   */
  async updateUser(id, userData) {
    try {
      const url = API_CONFIG.endpoints.users.update.replace(':id', id);
      const user = await apiService.put(url, userData);
      return {
        success: true,
        data: user,
        message: 'Usuário atualizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao atualizar usuário'
      };
    }
  }

  /**
   * Deletar usuário
   * @param {number} id - ID do usuário
   * @returns {Promise<Object>} Resultado da operação
   */
  async deleteUser(id) {
    try {
      const url = API_CONFIG.endpoints.users.delete.replace(':id', id);
      await apiService.delete(url);
      return {
        success: true,
        message: 'Usuário deletado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao deletar usuário'
      };
    }
  }

  /**
   * Buscar usuários por termo
   * @param {string} searchTerm - Termo de busca
   * @returns {Promise<Array>} Lista de usuários filtrados
   */
  async searchUsers(searchTerm) {
    try {
      const users = await apiService.get(`${API_CONFIG.endpoints.users.list}?search=${encodeURIComponent(searchTerm)}`);
      return {
        success: true,
        data: users
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao buscar usuários'
      };
    }
  }

  /**
   * Obter usuário atual
   * @returns {Promise<Object>} Dados do usuário atual
   */
  async getCurrentUser() {
    try {
      const user = await apiService.get('/user'); // Endpoint do Laravel Sanctum
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Erro ao obter usuário atual'
      };
    }
  }
}


const userService = new UserService();
export default userService; 