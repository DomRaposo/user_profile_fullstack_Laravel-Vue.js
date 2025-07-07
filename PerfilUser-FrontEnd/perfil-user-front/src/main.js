import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';


import { ApiService } from '@/services';


ApiService.setupInterceptors();


const app = createApp(App);


app.config.globalProperties.$api = ApiService;

app.mount('#app');
