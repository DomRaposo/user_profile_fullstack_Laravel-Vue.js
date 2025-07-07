// DEPRECATED: Este arquivo será removido em breve.
// Use os services centralizados em src/services/
import { API_CONFIG } from '@/config/api';
import axios from 'axios';

// Configuração global do axios (legacy)
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const api = axios.create({
    baseURL: API_CONFIG.baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// AVISO: Use AuthService em vez desta configuração
console.warn('DEPRECATED: src/axios.js será removido. Use AuthService, UserService ou ApiService.');

export default api;
