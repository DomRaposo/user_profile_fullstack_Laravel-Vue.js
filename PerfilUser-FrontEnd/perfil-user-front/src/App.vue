<template>
  <div id="app" class="app-container">

    <Login 
      v-if="currentPage === 'login'" 
      @loginSuccess="handleLoginSuccess" 
      @registerSuccess="handleRegisterSuccess"
    />


    <div v-else class="dashboard">

      <AppHeader 
        :user="currentUser"
        @logout="handleLogout"
        @profile="showProfile = true"
      />


      <main class="main-content">
        <div class="container">

          <div class="dashboard-header">
            <div class="header-info">
              <div class="header-text">
                <h1 class="dashboard-title">Dashboard</h1>
                <p class="dashboard-subtitle">
                  Bem-vindo, {{ currentUser?.fullName || 'Usuário' }}!
                </p>
              </div>
              

              <div class="header-actions">
                <button
                  @click="openCreateModal"
                  class="btn btn-primary"
                >
                  <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Novo Usuário
                </button>
              </div>
            </div>
          </div>


          <div class="stats-grid">

            <div class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">
                  <div class="icon-container icon-blue">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
                <div class="stat-info">
                  <dt class="stat-label">Total de Usuários</dt>
                  <dd class="stat-value">{{ users.length }}</dd>
                </div>
              </div>
            </div>


            <div class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">
                  <div class="icon-container icon-green">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="stat-info">
                  <dt class="stat-label">Status do Sistema</dt>
                  <dd class="stat-value">{{ isConnected ? 'Online' : 'Offline' }}</dd>
                </div>
              </div>
            </div>

            <!-- API Status -->
            <div class="stat-card">
              <div class="stat-content">
                <div class="stat-icon">
                  <div class="icon-container icon-purple">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div class="stat-info">
                  <dt class="stat-label">Backend</dt>
                  <dd class="stat-value">Laravel</dd>
                </div>
              </div>
            </div>
          </div>

          <!-- Users List -->
          <UserList 
            :users="users" 
            @new-user="openCreateModal"
            @view-user="openViewModal"
            @edit-user="openEditModal"
            @delete-user="deleteUser"
          />
        </div>
      </main>


      <AppFooter />
    </div>


    <ModalUserForm 
      v-if="showFormModal"
      :is-edit="isEdit"
      :user="selectedUser"
      @submit="handleSubmit"
      @close="closeFormModal"
    />
    
    <ModalUserView 
      v-if="showViewModal"
      :user="selectedUser"
      @close="closeViewModal"
    />


    <div v-if="showProfile" class="modal-overlay">
      <div class="profile-modal">
        <div class="profile-header">
          <h2 class="profile-title">Meu Perfil</h2>
          <button @click="showProfile = false" class="profile-close">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="profile-content">
          <div class="profile-field">
            <label class="profile-label">Nome</label>
            <p class="profile-value">{{ currentUser?.fullName }}</p>
          </div>
          <div class="profile-field">
            <label class="profile-label">Email</label>
            <p class="profile-value">{{ currentUser?.email }}</p>
          </div>
          <div class="profile-field">
            <label class="profile-label">ID</label>
            <p class="profile-value profile-id">{{ currentUser?.id }}</p>
          </div>
        </div>
        
        <div class="profile-footer">
          <button
            @click="showProfile = false"
            class="btn btn-primary"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>


    <div v-if="globalLoading" class="loading-overlay">
      <div class="loading-modal">
        <svg class="loading-spinner" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="loading-text">{{ loadingMessage }}</p>
      </div>
    </div>


    <div class="toast-container">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        :class="[
          'toast',
          toast.type === 'success' ? 'toast-success' : '',
          toast.type === 'error' ? 'toast-error' : '',
          toast.type === 'info' ? 'toast-info' : ''
        ]"
      >
        <div class="toast-content">
          <div class="toast-icon">
            <svg v-if="toast.type === 'success'" class="icon icon-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="toast.type === 'error'" class="icon icon-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else class="icon icon-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="toast-text">
            <p class="toast-title">{{ toast.title }}</p>
            <p class="toast-message">{{ toast.message }}</p>
          </div>
          <div class="toast-close">
            <button @click="removeToast(toast.id)" class="close-btn">
              <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import Login from './views/Login.vue';
import ModalUserForm from './components/ModalUserForm.vue';
import ModalUserView from './components/ModalUserView.vue';
import UserList from './components/UserList.vue';

import AuthService from './services/AuthService';
import UserService from './services/UserService';
import { ConfigUtils } from './config/api';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    Login,
    ModalUserForm,
    ModalUserView,
    UserList
  },
  data() {
    return {
      currentPage: 'login',
      currentUser: null,
      users: [],
      showFormModal: false,
      showViewModal: false,
      isEdit: false,
      selectedUser: null,
      showProfile: false,
      globalLoading: false,
      loadingMessage: '',
      isConnected: true,
      toasts: [],
      toastId: 0
    };
  },
  async mounted() {
    // Verificar se já está autenticado
    await this.checkAuthStatus();
    
    // Configurar listeners globais
    this.setupGlobalListeners();
    
    // Verificar conectividade
    this.checkConnectivity();
  },
  methods: {
    // ===================
    // Autenticação
    // ===================
    
    async checkAuthStatus() {
      try {
        if (AuthService.isAuthenticated()) {
          this.globalLoading = true;
          this.loadingMessage = 'Verificando autenticação...';
          
          // Obter usuário atual do Laravel Sanctum
          const userResponse = await UserService.getCurrentUser();
          
          if (userResponse.success) {
            this.currentUser = userResponse.data;
            this.currentPage = 'dashboard';
            await this.loadUsers();
          } else {
            // Token inválido, fazer logout
            AuthService.logout();
            this.currentPage = 'login';
          }
        }
      } catch (error) {
        ConfigUtils.debugLog('Erro ao verificar autenticação:', error);
        this.currentPage = 'login';
      } finally {
        this.globalLoading = false;
      }
    },

    async handleLoginSuccess(response) {
      try {
        this.globalLoading = true;
        this.loadingMessage = 'Entrando no sistema...';
        
        this.currentUser = response.user;
        this.currentPage = 'dashboard';
        
        await this.loadUsers();
        
        this.showToast('success', 'Login realizado!', 'Bem-vindo ao sistema.');
        
      } catch (error) {
        ConfigUtils.debugLog('Erro após login:', error);
        this.showToast('error', 'Erro', 'Erro ao carregar dados do usuário.');
      } finally {
        this.globalLoading = false;
      }
    },

    async handleRegisterSuccess() {
      this.showToast('success', 'Conta criada!', 'Sua conta foi criada com sucesso. Faça login para continuar.');
    },

    async handleLogout() {
      try {
        this.globalLoading = true;
        this.loadingMessage = 'Fazendo logout...';
        
        await AuthService.logout();
        
        // Limpar dados locais
        this.currentUser = null;
        this.users = [];
        this.currentPage = 'login';
        
        this.showToast('info', 'Logout realizado', 'Você foi desconectado com sucesso.');
        
      } catch (error) {
        ConfigUtils.debugLog('Erro no logout:', error);
        // Mesmo com erro, limpar dados locais
        this.currentUser = null;
        this.users = [];
        this.currentPage = 'login';
      } finally {
        this.globalLoading = false;
      }
    },

    // ===================
    // Gerenciamento de Usuários
    // ===================

    async loadUsers() {
      try {
        this.globalLoading = true;
        const response = await UserService.getAllUsers();
        
        if (response.success) {
          this.users = response.data || [];
          ConfigUtils.debugLog(`${this.users.length} usuários carregados`);
        } else {
          this.showToast('error', 'Erro', response.error || 'Erro ao carregar lista de usuários.');
        }
      } catch (error) {
        ConfigUtils.debugLog('Erro ao carregar usuários:', error);
        this.showToast('error', 'Erro', 'Erro ao carregar lista de usuários.');
      } finally {
        this.globalLoading = false;
      }
    },

    openCreateModal() {
      this.isEdit = false;
      this.selectedUser = null;
      this.showFormModal = true;
    },

    openEditModal(user) {
      this.isEdit = true;
      this.selectedUser = user;
      this.showFormModal = true;
    },

    openViewModal(user) {
      this.selectedUser = user;
      this.showViewModal = true;
    },

    closeFormModal() {
      this.showFormModal = false;
      this.selectedUser = null;
      this.isEdit = false;
    },

    closeViewModal() {
      this.showViewModal = false;
      this.selectedUser = null;
    },

    async handleSubmit(userData) {
      try {
        this.globalLoading = true;
        
        if (this.isEdit) {
          this.loadingMessage = 'Atualizando usuário...';
          const response = await UserService.updateUser(this.selectedUser.id, userData);
          
          if (response.success) {
            this.showToast('success', 'Usuário atualizado!', `${userData.fullName} foi atualizado com sucesso.`);
            this.closeFormModal();
            await this.loadUsers();
          } else {
            this.showToast('error', 'Erro', response.error || 'Erro ao atualizar usuário.');
          }
        } else {
          this.loadingMessage = 'Criando usuário...';
          const response = await UserService.createUser(userData);
          
          if (response.success) {
            this.showToast('success', 'Usuário criado!', `${userData.fullName} foi criado com sucesso.`);
            this.closeFormModal();
            await this.loadUsers();
          } else {
            this.showToast('error', 'Erro', response.error || 'Erro ao criar usuário.');
          }
        }
        
      } catch (error) {
        ConfigUtils.debugLog('Erro ao salvar usuário:', error);
        this.showToast('error', 'Erro', 'Erro ao salvar usuário. Tente novamente.');
      } finally {
        this.globalLoading = false;
      }
    },

    async deleteUser(userId) {
      if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
          this.globalLoading = true;
          this.loadingMessage = 'Excluindo usuário...';
          
          const response = await UserService.deleteUser(userId);
          
          if (response.success) {
            this.showToast('success', 'Usuário excluído!', 'Usuário foi removido do sistema.');
            await this.loadUsers();
          } else {
            this.showToast('error', 'Erro', response.error || 'Erro ao excluir usuário.');
          }
        } catch (error) {
          ConfigUtils.debugLog('Erro ao excluir usuário:', error);
          this.showToast('error', 'Erro', 'Erro ao excluir usuário.');
        } finally {
          this.globalLoading = false;
        }
      }
    },

    // ===================
    // Sistema de Notificações
    // ===================

    showToast(type, title, message) {
      const toast = {
        id: ++this.toastId,
        type,
        title,
        message
      };
      
      this.toasts.push(toast);
      
      // Auto-remover após 5 segundos
      setTimeout(() => {
        this.removeToast(toast.id);
      }, 5000);
    },

    removeToast(id) {
      this.toasts = this.toasts.filter(toast => toast.id !== id);
    },

    // ===================
    // Utilitários
    // ===================

    setupGlobalListeners() {
      // Listener para logout forçado
      window.addEventListener('auth:logout', () => {
        this.currentUser = null;
        this.users = [];
        this.currentPage = 'login';
        this.showToast('info', 'Sessão expirada', 'Faça login novamente.');
      });

      // Listener para errors de rede
      window.addEventListener('online', () => {
        this.isConnected = true;
        this.showToast('success', 'Conectado', 'Conexão restaurada.');
      });

      window.addEventListener('offline', () => {
        this.isConnected = false;
        this.showToast('error', 'Sem conexão', 'Verifique sua internet.');
      });
    },

    checkConnectivity() {
      this.isConnected = navigator.onLine;
    }
  }
};
</script>

<style>
/* Estilos globais */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Transições globais */
* {
  transition: all 0.2s ease-in-out;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.app-container {
  min-height: 100vh;
  background: #f8fafc;
}

.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  background: #f8fafc;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.header-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-text {
  display: flex;
  flex-direction: column;
}

.dashboard-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.dashboard-subtitle {
  margin: 0.5rem 0 0;
  color: #6b7280;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  flex-shrink: 0;
}

.icon-container {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-blue {
  background: #3b82f6;
}

.icon-green {
  background: #10b981;
}

.icon-purple {
  background: #8b5cf6;
}

.icon-container .icon {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}

.stat-info {
  margin-left: 1.25rem;
  min-width: 0;
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: none;
  margin: 0;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.profile-modal {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  margin: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.profile-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.profile-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;
}

.profile-close:hover {
  color: #374151;
}

.profile-close .icon {
  width: 1.5rem;
  height: 1.5rem;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.profile-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.profile-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.profile-value {
  font-size: 0.875rem;
  color: #1f2937;
  margin: 0;
}

.profile-id {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #6b7280;
}

.profile-footer {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-modal {
  background: white;
  border-radius: 0.75rem;
  padding: 2rem;
  max-width: 24rem;
  width: 90%;
  margin: 1rem;
  text-align: center;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  color: #3b82f6;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #6b7280;
  margin: 0;
}

.toast-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
}

.toast {
  max-width: 24rem;
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  pointer-events: auto;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.toast-success {
  border-left: 4px solid #10b981;
}

.toast-error {
  border-left: 4px solid #ef4444;
}

.toast-info {
  border-left: 4px solid #3b82f6;
}

.toast-content {
  padding: 1rem;
  display: flex;
  align-items: flex-start;
}

.toast-icon {
  flex-shrink: 0;
}

.toast-icon .icon {
  width: 1.5rem;
  height: 1.5rem;
}

.icon-success {
  color: #10b981;
}

.icon-error {
  color: #ef4444;
}

.icon-info {
  color: #3b82f6;
}

.toast-text {
  margin-left: 0.75rem;
  min-width: 0;
  flex: 1;
}

.toast-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.toast-message {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #6b7280;
}

.toast-close {
  margin-left: 1rem;
  flex-shrink: 0;
  display: flex;
}

.close-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #6b7280;
}

.close-btn .icon {
  width: 1.25rem;
  height: 1.25rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.opacity-25 {
  opacity: 0.25;
}

.opacity-75 {
  opacity: 0.75;
}

/* Classes utilitárias */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .header-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-actions {
    width: 100%;
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .main-content {
    padding: 1rem 0;
  }
  
  .dashboard-header {
    margin-bottom: 1rem;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
  }
  
  .profile-modal {
    margin: 0.5rem;
  }
  
  .loading-modal {
    margin: 0.5rem;
  }
  
  .toast-container {
    bottom: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
  }
  
  .toast {
    max-width: none;
  }
}
</style>
