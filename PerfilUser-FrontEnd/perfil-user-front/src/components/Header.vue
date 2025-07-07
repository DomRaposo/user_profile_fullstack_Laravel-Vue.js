<template>
  <header class="header">
    <div class="header-content">
      <div class="user-info">
        <h1 class="header-title">{{ user ? 'Dashboard' : 'Gestão de Usuários' }}</h1>
        <p v-if="user" class="header-subtitle">Bem-vindo, {{ user.fullName }}!</p>
      </div>
      
      <div v-if="user" class="header-actions">
        <button @click="$emit('profile')" class="header-button profile-button">
          <svg class="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Perfil
        </button>
        <button @click="$emit('logout')" class="header-button logout-button">
          <svg class="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: ['user'],
  emits: ['logout', 'profile']
};
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.header-subtitle {
  font-size: 0.875rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.header-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.profile-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.logout-button {
  background: rgba(239, 68, 68, 0.8);
  color: white;
}

.logout-button:hover {
  background: rgba(220, 38, 38, 0.9);
}

.header-icon {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .header-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }
}
</style>
