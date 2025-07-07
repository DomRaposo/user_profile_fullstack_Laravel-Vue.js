import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';

// Importar services centralizados
import { ApiService } from '@/services';

// Configurar interceptors globais
ApiService.setupInterceptors();

// Criar aplicação Vue
const app = createApp(App);

// Disponibilizar services globalmente (opcional)
app.config.globalProperties.$api = ApiService;

app.mount('#app');
