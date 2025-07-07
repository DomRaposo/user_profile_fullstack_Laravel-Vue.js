<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Perfil do Usuário</h2>
        <button class="close-button" @click="closeModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="profile-section">
          <div class="profile-header">
            <div class="profile-avatar">
              <img v-if="user.profile_image" :src="user.profile_image" :alt="user.fullName" @error="hideImage" />
              <div v-else class="avatar-placeholder">
                {{ getInitials(user.fullName) }}
              </div>
            </div>
            <div class="profile-info">
              <h3 class="profile-name">{{ user.fullName }}</h3>
              <p class="profile-email">{{ user.email }}</p>
              <div class="profile-id">ID: {{ user.id }}</div>
            </div>
          </div>
        </div>

        <div class="details-section">
          <div class="section-header">
            <h4>Informações Pessoais</h4>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nome Completo</span>
              <span class="info-value">{{ user.fullName }}</span>
            </div>
            
            <div class="info-item">
              <span class="info-label">Email</span>
              <span class="info-value">{{ user.email }}</span>
            </div>
            
            <div class="info-item">
              <span class="info-label">Idade</span>
              <span class="info-value">{{ user.age || 'N/A' }}</span>
            </div>
            
            <div class="info-item">
              <span class="info-label">Foto de Perfil</span>
              <span class="info-value">
                <a v-if="user.profile_image" :href="user.profile_image" target="_blank" class="profile-link">
                  Ver imagem
                </a>
                <span v-else class="no-data">Não informado</span>
              </span>
            </div>
            
            <div class="info-item" v-if="user.biography">
              <span class="info-label">Biografia</span>
              <span class="info-value">{{ user.biography }}</span>
            </div>
          </div>
        </div>

        <div class="details-section">
          <div class="section-header">
            <h4>Endereço</h4>
          </div>
          
          <div v-if="hasAddress" class="address-card">
            <div class="address-content">
              <div class="address-line" v-if="user.street">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ user.street }}</span>
              </div>
              
              <div class="address-line" v-if="user.neighborhood">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.48 3.47-.81"/>
                  <path d="M22 12c0 5.55-3.84 10-9 11-1.16-.21-2.31-.48-3.47-.81"/>
                </svg>
                <span>{{ user.neighborhood }}</span>
              </div>
              
              <div class="address-line" v-if="user.city || user.state">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 21h18M4 21V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14M8 9v2M8 13v2M16 9v2M16 13v2"/>
                </svg>
                <span>
                  <span v-if="user.city">{{ user.city }}</span>
                  <span v-if="user.state"> - {{ user.state }}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div v-else class="no-address">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h5>Endereço não informado</h5>
            <p>Nenhuma informação de endereço foi cadastrada para este usuário.</p>
          </div>
        </div>

        <div class="details-section">
          <div class="section-header">
            <h4>Informações do Sistema</h4>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">ID do Usuário</span>
              <span class="info-value">{{ user.id }}</span>
            </div>
            
            <div class="info-item" v-if="user.created_at">
              <span class="info-label">Data de Cadastro</span>
              <span class="info-value">{{ formatDate(user.created_at) }}</span>
            </div>
            
            <div class="info-item" v-if="user.updated_at">
              <span class="info-label">Última Atualização</span>
              <span class="info-value">{{ formatDate(user.updated_at) }}</span>
            </div>
            
            <div class="info-item" v-if="user.email_verified_at">
              <span class="info-label">Email Verificado</span>
              <span class="info-value">{{ formatDate(user.email_verified_at) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="closeModal" class="btn-close">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalUserView',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasAddress() {
      return this.user.street || this.user.neighborhood || this.user.city || this.user.state;
    }
  },
  methods: {
    getInitials(fullName) {
      if (!fullName) return '?';
      return fullName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
    },
    closeModal() {
      this.$emit('close');
    },
    hideImage(event) {
      event.target.style.display = 'none';
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        return new Date(dateString).toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch {
        return 'N/A';
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  color: #7f8c8d;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #f8f9fa;
  color: #e74c3c;
}

.modal-body {
  padding: 30px;
}

.profile-section {
  margin-bottom: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  backdrop-filter: blur(10px);
}

.profile-info {
  flex: 1;
}

.profile-name {
  margin: 0 0 5px;
  font-size: 24px;
  font-weight: 600;
  color: white;
}

.profile-email {
  margin: 0 0 8px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.profile-id {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-family: monospace;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
}

.details-section {
  margin-bottom: 30px;
}

.section-header {
  margin-bottom: 20px;
}

.section-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #3498db;
}

.info-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
}

.info-value {
  font-size: 14px;
  color: #34495e;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
}

.profile-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.profile-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.no-data {
  color: #95a5a6;
  font-style: italic;
}

.address-card {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 20px;
  border-left: 4px solid #27ae60;
}

.address-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.address-line {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #2c3e50;
  font-size: 14px;
}

.address-line svg {
  color: #27ae60;
  flex-shrink: 0;
}

.no-address {
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
  background: #f8f9fa;
  border-radius: 15px;
}

.no-address svg {
  margin-bottom: 15px;
  opacity: 0.5;
}

.no-address h5 {
  margin: 0 0 8px;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
}

.no-address p {
  margin: 0;
  font-size: 14px;
}

.modal-footer {
  padding: 20px 30px 30px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #f0f0f0;
}

.btn-close {
  padding: 12px 24px;
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.btn-close:hover {
  background: linear-gradient(135deg, #7f8c8d, #6c757d);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(149, 165, 166, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 10px;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 20px;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-avatar {
    width: 60px;
    height: 60px;
  }
  
  .avatar-placeholder {
    font-size: 20px;
  }
  
  .profile-name {
    font-size: 20px;
  }
  
  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .info-value {
    max-width: 100%;
    text-align: left;
  }
}
</style>