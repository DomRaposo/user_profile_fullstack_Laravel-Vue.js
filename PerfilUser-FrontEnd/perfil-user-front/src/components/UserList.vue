<template>
  <div class="user-list-container">
    <div class="list-header">
      <h2>Usuários Cadastrados</h2>
      <button @click="$emit('new-user')" class="btn-new-user">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <line x1="19" y1="8" x2="19" y2="14"/>
          <line x1="22" y1="11" x2="16" y2="11"/>
        </svg>
        Novo Usuário
      </button>
    </div>

    <div class="table-wrapper">
      <table class="users-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="user-row">
            <td class="photo-cell">
              <div class="user-avatar">
                <img v-if="user.profile_image" :src="user.profile_image" :alt="user.fullName" @error="hideImage" />
                <div v-else class="avatar-placeholder">
                  {{ getInitials(user.fullName) }}
                </div>
              </div>
            </td>
            <td class="name-cell">
              <div class="user-name">{{ user.fullName }}</div>
            </td>
            <td class="email-cell">
              <div class="user-email">{{ user.email }}</div>
            </td>
            <td class="age-cell">
              <div class="user-age">{{ user.age || 'N/A' }}</div>
            </td>
            <td class="address-cell">
              <div class="user-address">
                <div v-if="hasAddress(user)" class="address-content">
                  <div class="address-line">
                    {{ user.street }}, {{ user.neighborhood }}
                  </div>
                  <div class="address-line">
                    {{ user.city }} - {{ user.state }}
                  </div>
                </div>
                <div v-else class="no-address">
                  <span>Não informado</span>
                </div>
              </div>
            </td>
            <td class="actions-cell">
              <div class="action-buttons">
                <button @click="$emit('view-user', user)" class="btn-action btn-view" title="Visualizar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                <button @click="$emit('edit-user', user)" class="btn-action btn-edit" title="Editar">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="m18.5 2.5 1.414 1.414L7 17H3v-4L16.086 2.086z"/>
                  </svg>
                </button>
                <button @click="$emit('delete-user', user.id)" class="btn-action btn-delete" title="Excluir">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3,6 5,6 21,6"/>
                    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="users.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <h3>Nenhum usuário cadastrado</h3>
      <p>Clique no botão "Novo Usuário" para começar.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  methods: {
    getInitials(fullName) {
      if (!fullName) return 'U';
      return fullName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
    },
    hasAddress(user) {
      return user.street && user.street.trim() !== '' && 
             user.neighborhood && user.neighborhood.trim() !== '' &&
             user.city && user.city.trim() !== '' &&
             user.state && user.state.trim() !== '';
    },
    hideImage(event) {
      event.target.style.display = 'none';
    }
  }
}
</script>

<style scoped>
.user-list-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 20px 0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.list-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.btn-new-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.btn-new-user:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.table-wrapper {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.users-table th {
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e9ecef;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.users-table td {
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.user-row {
  transition: all 0.2s ease;
}

.user-row:hover {
  background: #f8f9fa;
}

.photo-cell {
  width: 80px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.name-cell {
  min-width: 200px;
}

.user-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

.email-cell {
  min-width: 250px;
}

.user-email {
  color: #7f8c8d;
  font-size: 14px;
}

.age-cell {
  min-width: 100px;
}

.user-age {
  color: #7f8c8d;
  font-size: 14px;
  font-weight: 500;
}

.address-cell {
  min-width: 300px;
  max-width: 400px;
}

.address-content {
  font-size: 14px;
  color: #34495e;
  line-height: 1.4;
}

.address-line {
  margin-bottom: 2px;
}

.zip-code {
  font-weight: 500;
  color: #2c3e50;
}

.no-address {
  color: #95a5a6;
  font-style: italic;
  font-size: 14px;
}

.actions-cell {
  width: 150px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-view {
  background: #e3f2fd;
  color: #1976d2;
}

.btn-view:hover {
  background: #bbdefb;
  transform: translateY(-1px);
}

.btn-edit {
  background: #fff3e0;
  color: #f57c00;
}

.btn-edit:hover {
  background: #ffe0b2;
  transform: translateY(-1px);
}

.btn-delete {
  background: #ffebee;
  color: #d32f2f;
}

.btn-delete:hover {
  background: #ffcdd2;
  transform: translateY(-1px);
}

.empty-state {
  text-align: center;
  padding: 60px 30px;
  color: #7f8c8d;
}

.empty-state svg {
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 10px;
  color: #2c3e50;
  font-size: 18px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

/* Responsividade */
@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .users-table {
    font-size: 14px;
  }
  
  .users-table th,
  .users-table td {
    padding: 15px 10px;
  }
  
  .address-cell {
    min-width: 250px;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 5px;
  }
}

@media (max-width: 480px) {
  .user-list-container {
    margin: 10px 0;
    border-radius: 12px;
  }
  
  .list-header {
    padding: 20px;
  }
  
  .list-header h2 {
    font-size: 20px;
  }
  
  .users-table th,
  .users-table td {
    padding: 12px 8px;
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
  }
  
  .avatar-placeholder {
    font-size: 14px;
  }
}
</style>

