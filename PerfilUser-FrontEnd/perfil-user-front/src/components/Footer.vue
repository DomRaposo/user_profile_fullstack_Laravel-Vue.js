<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">© 2025 Perfil User - Sistema de Gerenciamento de Usuários</p>
      <div class="footer-links">
        <span class="footer-link">Desenvolvido com Vue.js + Laravel</span>
        <span class="footer-separator">•</span>
        <span class="footer-link">Versão 1.0.0</span>
        <span class="footer-separator">•</span>
        <span class="footer-link">Desenvolvido por <a href="https://github.com/DomRaposo" target="_blank" rel="noopener" class="developer-link">Felipe Oliveira</a></span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
};
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-top: 1px solid #e5e7eb;
  padding: 1rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.footer-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-link {
  font-size: 0.75rem;
  color: #9ca3af;
}

.footer-separator {
  font-size: 0.75rem;
  color: #d1d5db;
}

.developer-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.developer-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer-content {
    text-align: center;
  }
  
  .footer-text {
    font-size: 0.75rem;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .footer-separator {
    display: none;
  }
}
</style>
