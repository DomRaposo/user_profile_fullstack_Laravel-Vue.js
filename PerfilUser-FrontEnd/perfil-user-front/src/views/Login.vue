<template>
  <div class="login-container">
    <!-- Elementos flutuantes animados -->
    <div class="floating-elements">
      <div class="blob blob-purple"></div>
      <div class="blob blob-blue"></div>
      <div class="blob blob-pink"></div>
    </div>

    <!-- Partículas flutuantes -->
    <div class="particles">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
    </div>

    <!-- Container principal -->
    <div class="login-card-container">
      <!-- Card principal -->
      <div class="login-card">
        <!-- Header -->
        <div class="login-header">
          <div class="login-icon">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 class="login-title">Bem-vindo</h1>
          <p class="login-subtitle">Entre em sua conta para continuar</p>
        </div>

        <!-- Mensagem de erro -->
        <div v-if="errorMessage" class="message message-error">
          <div class="message-content">
            <svg class="message-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>
        </div>

        <!-- Mensagem de sucesso -->
        <div v-if="successMessage" class="message message-success">
          <div class="message-content">
            <svg class="message-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>{{ successMessage }}</span>
          </div>
        </div>

        <!-- Formulário -->
        <form @submit.prevent="login" class="login-form">
          <!-- Campo Email -->
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <div class="input-group">
              <div class="input-icon">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                :disabled="loading"
                placeholder="seu@email.com"
                class="form-input"
              >
            </div>
          </div>

          <!-- Campo Senha -->
          <div class="form-group">
            <label for="password" class="form-label">Senha</label>
            <div class="input-group">
              <div class="input-icon">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                :disabled="loading"
                placeholder="••••••••"
                class="form-input"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                :disabled="loading"
                class="password-toggle"
              >
                <svg v-if="showPassword" class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
                <svg v-else class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Botão de Login -->
          <button
            type="submit"
            :disabled="loading || !form.email || !form.password"
            class="login-button"
          >
            <div v-if="loading" class="button-loading">
              <svg class="loading-spinner" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Entrando...</span>
            </div>
            <span v-else>Entrar</span>
          </button>
        </form>

        <!-- Links adicionais -->
        <div class="login-footer">
          <p class="register-text">
            Não tem uma conta?
            <button 
              @click="showRegisterForm = true"
              :disabled="loading"
              class="register-link"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="login-page-footer">
        <p class="footer-text">
          Perfil User © 2024 - Sistema de Gerenciamento de Usuários
        </p>
      </div>
    </div>

    <!-- Modal de Registro -->
    <div v-if="showRegisterForm" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Criar Conta</h2>
          <button 
            @click="showRegisterForm = false"
            :disabled="registerLoading"
            class="modal-close"
          >
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="register" class="register-form">
          <!-- Nome completo -->
          <div class="form-group">
            <label class="form-label">Nome completo</label>
            <input
              v-model="registerForm.fullName"
              type="text"
              required
              :disabled="registerLoading"
              placeholder="Seu nome completo"
              class="form-input modal-input"
            >
          </div>

          <!-- Idade -->
          <div class="form-group">
            <label class="form-label">Idade</label>
            <input
              v-model.number="registerForm.age"
              type="number"
              required
              min="0"
              :disabled="registerLoading"
              placeholder="Sua idade"
              class="form-input modal-input"
            >
          </div>

          <!-- Rua -->
          <div class="form-group">
            <label class="form-label">Rua</label>
            <input
              v-model="registerForm.street"
              type="text"
              required
              :disabled="registerLoading"
              placeholder="Nome da rua"
              class="form-input modal-input"
            >
          </div>

          <!-- Bairro -->
          <div class="form-group">
            <label class="form-label">Bairro</label>
            <input
              v-model="registerForm.neighborhood"
              type="text"
              required
              :disabled="registerLoading"
              placeholder="Nome do bairro"
              class="form-input modal-input"
            >
          </div>

          <!-- Estado -->
          <div class="form-group">
            <label class="form-label">Estado</label>
            <input
              v-model="registerForm.state"
              type="text"
              required
              :disabled="registerLoading"
              placeholder="Estado (UF)"
              class="form-input modal-input"
            >
          </div>

          <!-- Cidade -->
          <div class="form-group">
            <label class="form-label">Cidade</label>
            <input
              v-model="registerForm.city"
              type="text"
              required
              :disabled="registerLoading"
              placeholder="Nome da cidade"
              class="form-input modal-input"
            >
          </div>

          <!-- Biografia (opcional) -->
          <div class="form-group">
            <label class="form-label">Biografia (opcional)</label>
            <textarea
              v-model="registerForm.biography"
              :disabled="registerLoading"
              placeholder="Conte um pouco sobre você"
              class="form-input modal-input"
              rows="3"
            ></textarea>
          </div>

          <!-- Foto de Perfil (opcional) -->
          <div class="form-group">
            <label class="form-label">Foto de Perfil (opcional)</label>
            <input
              v-model="registerForm.profile_image"
              type="url"
              :disabled="registerLoading"
              placeholder="https://exemplo.com/foto.jpg"
              class="form-input modal-input"
            >
          </div>

          <!-- Email -->
          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              :disabled="registerLoading"
              placeholder="seu@email.com"
              class="form-input modal-input"
            >
          </div>

          <!-- Senha -->
          <div class="form-group">
            <label class="form-label">Senha</label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              :disabled="registerLoading"
              placeholder="••••••••"
              class="form-input modal-input"
            >
          </div>

          <!-- Confirmar Senha -->
          <div class="form-group">
            <label class="form-label">Confirmar Senha</label>
            <input
              v-model="registerForm.confirmPassword"
              type="password"
              required
              :disabled="registerLoading"
              placeholder="••••••••"
              class="form-input modal-input"
            >
          </div>

          <!-- Botão de Registro -->
          <button
            type="submit"
            :disabled="registerLoading || !isRegisterFormValid"
            class="register-button"
          >
            <div v-if="registerLoading" class="button-loading">
              <svg class="loading-spinner" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Criando conta...</span>
            </div>
            <span v-else>Criar Conta</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import { ConfigUtils } from '@/config/api';

export default {
  name: 'UserLogin',
  emits: ['loginSuccess', 'registerSuccess'],
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      registerForm: {
        fullName: '',
        age: null,
        street: '',
        neighborhood: '',
        state: '',
        city: '',
        biography: '',
        profile_image: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
      registerLoading: false,
      errorMessage: '',
      successMessage: '',
      showPassword: false,
      showRegisterForm: false
    };
  },
  computed: {
    isRegisterFormValid() {
      return this.registerForm.fullName && 
             this.registerForm.age &&
             this.registerForm.street &&
             this.registerForm.neighborhood &&
             this.registerForm.state &&
             this.registerForm.city &&
             this.registerForm.email && 
             this.registerForm.password && 
             this.registerForm.confirmPassword &&
             this.registerForm.password === this.registerForm.confirmPassword;
    }
  },
  mounted() {
    // Configurar listeners de autenticação
    // AuthService.setupEventListeners();
    
    // Limpar mensagens após um tempo
    this.setupMessageTimeout();
  },
  methods: {
    async login() {
      if (this.loading) return;
      
      try {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';
        
        ConfigUtils.debugLog('Tentativa de login:', { email: this.form.email });
        
        // Fazer login usando AuthService
        const response = await AuthService.login(this.form);
        
        if (response.success) {
          this.successMessage = 'Login realizado com sucesso!';
          
          // Emitir evento de sucesso
          this.$emit('loginSuccess', response);
          
          // Limpar formulário
          this.resetForm();
          
          ConfigUtils.debugLog('Login efetuado com sucesso');
        } else {
          this.errorMessage = response.error || 'Erro ao fazer login';
        }
        
      } catch (error) {
        ConfigUtils.debugLog('Erro ao fazer login:', error);
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async register() {
      if (this.registerLoading) return;
      
      try {
        this.registerLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        
        ConfigUtils.debugLog('Tentativa de registro:', { 
          name: this.registerForm.fullName,
          email: this.registerForm.email 
        });
        
        // Verificar se as senhas coincidem
        if (this.registerForm.password !== this.registerForm.confirmPassword) {
          this.errorMessage = 'As senhas devem ser iguais';
          return;
        }
        
        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!this.registerForm.fullName || !this.registerForm.age || 
            !this.registerForm.street || !this.registerForm.neighborhood || 
            !this.registerForm.state || !this.registerForm.city) {
          this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
          return;
        }
        
        // Preparar dados para o Laravel
        const userData = {
          fullName: this.registerForm.fullName,
          age: parseInt(this.registerForm.age),
          street: this.registerForm.street,
          neighborhood: this.registerForm.neighborhood,
          state: this.registerForm.state,
          city: this.registerForm.city,
          biography: this.registerForm.biography || null,
          profile_image: this.registerForm.profile_image || null,
          email: this.registerForm.email,
          password: this.registerForm.password
        };
        
        // Fazer registro usando AuthService
        const response = await AuthService.register(userData);
        
        if (response.success) {
          this.successMessage = 'Conta criada com sucesso!';
          this.showRegisterForm = false;
          
          // Emitir evento de sucesso
          this.$emit('registerSuccess', response);
          
          // Limpar formulário de registro
          this.resetRegisterForm();
          
          ConfigUtils.debugLog('Registro efetuado com sucesso');
        } else {
          this.errorMessage = response.error || 'Erro ao criar conta';
        }
        
      } catch (error) {
        ConfigUtils.debugLog('Erro ao fazer registro:', error);
        this.handleError(error);
      } finally {
        this.registerLoading = false;
      }
    },

    formatAddress() {
      const address = [];
      
      if (this.registerForm.street) {
        address.push(this.registerForm.street);
        if (this.registerForm.number) {
          address.push(this.registerForm.number);
        }
      }
      
      if (this.registerForm.complement) {
        address.push(this.registerForm.complement);
      }
      
      if (this.registerForm.neighborhood) {
        address.push(this.registerForm.neighborhood);
      }
      
      if (this.registerForm.city) {
        address.push(this.registerForm.city);
      }
      
      if (this.registerForm.state) {
        address.push(this.registerForm.state);
      }
      
      if (this.registerForm.zipCode) {
        address.push(this.registerForm.zipCode);
      }
      
      if (this.registerForm.country) {
        address.push(this.registerForm.country);
      }
      
      return address.length > 0 ? address.join(', ') : null;
    },

    handleError(error) {
      // Verificar se error é null ou undefined
      if (!error) {
        this.errorMessage = 'Erro inesperado. Tente novamente mais tarde.';
        return;
      }

      switch (error.type) {
        case 'validation':
          if (error.errors && Object.keys(error.errors).length > 0) {
            // Mostrar primeiro erro de validação
            const firstError = Object.values(error.errors)[0];
            this.errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
          } else {
            this.errorMessage = error.message || 'Dados inválidos. Verifique os campos.';
          }
          break;
          
        case 'unauthorized':
          this.errorMessage = error.message || 'Email ou senha incorretos';
          break;
          
        case 'conflict':
          this.errorMessage = error.message || 'Email já está em uso';
          break;
          
        case 'network':
          this.errorMessage = 'Erro de conexão. Verifique sua internet.';
          break;
          
        default:
          this.errorMessage = error.message || 'Erro interno do servidor. Tente novamente mais tarde.';
      }
      
      // Limpar mensagem de erro após 10 segundos
      setTimeout(() => {
        this.errorMessage = '';
      }, 10000);
    },

    resetForm() {
      this.form.email = '';
      this.form.password = '';
    },

    formatZipCode() {
      let value = this.registerForm.zipCode.replace(/\D/g, '')
      if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2')
      }
      this.registerForm.zipCode = value
    },

    resetRegisterForm() {
      this.registerForm.fullName = '';
      this.registerForm.age = null;
      this.registerForm.street = '';
      this.registerForm.neighborhood = '';
      this.registerForm.state = '';
      this.registerForm.city = '';
      this.registerForm.biography = '';
      this.registerForm.profile_image = '';
      this.registerForm.email = '';
      this.registerForm.password = '';
      this.registerForm.confirmPassword = '';
    },

    setupMessageTimeout() {
      // Limpar mensagens de sucesso após 5 segundos
      this.$watch('successMessage', (newVal) => {
        if (newVal) {
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.blob {
  position: absolute;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  mix-blend-mode: multiply;
  filter: blur(3rem);
  opacity: 0.2;
  animation: blob 7s infinite;
}

.blob-purple {
  background: #8b5cf6;
  top: -10rem;
  right: -8rem;
}

.blob-blue {
  background: #3b82f6;
  bottom: -10rem;
  left: -8rem;
  animation-delay: 2s;
}

.blob-pink {
  background: #ec4899;
  top: 10rem;
  left: 10rem;
  animation-delay: 4s;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  animation: float 6s ease-in-out infinite;
}

.particle-1 {
  width: 0.5rem;
  height: 0.5rem;
  top: 25%;
  left: 25%;
}

.particle-2 {
  width: 0.25rem;
  height: 0.25rem;
  top: 33%;
  right: 33%;
  background: rgba(139, 92, 246, 0.3);
  animation-delay: 1s;
}

.particle-3 {
  width: 0.75rem;
  height: 0.75rem;
  bottom: 25%;
  left: 33%;
  background: rgba(59, 130, 246, 0.2);
  animation-delay: 2s;
}

.particle-4 {
  width: 0.25rem;
  height: 0.25rem;
  bottom: 33%;
  right: 25%;
  background: rgba(236, 72, 153, 0.3);
  animation-delay: 3s;
}

.login-card-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 28rem;
  margin: 0 1rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.login-card:hover {
  background: rgba(255, 255, 255, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.login-icon .icon {
  width: 2rem;
  height: 2rem;
  color: white;
}

.login-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem;
}

.login-subtitle {
  color: #d1d5db;
  font-size: 0.875rem;
  margin: 0;
}

.message {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
}

.message-error {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  animation: shake 0.5s ease-in-out;
}

.message-success {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.message-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.message-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.message-error .message-icon {
  color: #fca5a5;
}

.message-success .message-icon {
  color: #86efac;
}

.message-content span {
  font-size: 0.875rem;
  color: white;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #d1d5db;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 2;
}

.input-icon .icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.input-group:focus-within .input-icon .icon {
  color: #3b82f6;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(107, 114, 128, 0.5);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-sizing: border-box;
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;
  z-index: 2;
}

.password-toggle:hover:not(:disabled) {
  color: #d1d5db;
}

.password-toggle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.password-toggle .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.login-button {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}

.login-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}

.login-button:disabled {
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.button-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.loading-spinner {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.register-text {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0;
}

.register-link {
  background: none;
  border: none;
  color: #60a5fa;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
}

.register-link:hover:not(:disabled) {
  color: #93c5fd;
}

.register-link:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.login-page-footer {
  text-align: center;
  margin-top: 2rem;
}

.footer-text {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

/* Novos estilos para formulário de registro */
.form-section {
  margin-bottom: 25px;
}

.form-section-title {
  margin: 0 0 15px;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid #667eea;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 0;
}

.form-row .form-group {
  flex: 1;
}

.form-group-small {
  flex: 0 0 100px !important;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-group-small {
    flex: 1 !important;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 28rem;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: color 0.2s ease;
}

.modal-close:hover:not(:disabled) {
  color: #d1d5db;
}

.modal-close:disabled {
  opacity: 0.5;
}

.modal-close .icon {
  width: 1.5rem;
  height: 1.5rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-input {
  padding-left: 1rem;
}

.register-button {
  width: 100%;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;
  margin-top: 1.5rem;
}

.register-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669 0%, #2563eb 100%);
  transform: translateY(-1px);
}

.register-button:disabled {
  background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
  cursor: not-allowed;
  transform: none;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes blob {
  0%, 100% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
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

@media (max-width: 768px) {
  .login-card-container {
    margin: 0 0.5rem;
  }
  
  .login-card {
    padding: 1.5rem;
  }
  
  .login-title {
    font-size: 1.5rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .blob {
    width: 15rem;
    height: 15rem;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 1rem;
  }
  
  .modal-content {
    padding: 1rem;
  }
  
  .login-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .login-icon .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>

