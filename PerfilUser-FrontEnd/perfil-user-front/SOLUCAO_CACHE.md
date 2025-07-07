# 🔧 Solução para Problema de Cache

## Problema Identificado

O erro `POST http://localhost:3000/api/auth/register net::ERR_CONNECTION_REFUSED` indica que o navegador está usando uma versão em cache da configuração antiga (NestJS na porta 3000).

## Soluções

### 1. Limpar Cache do Navegador

1. **Chrome/Edge:**
   - Pressione `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
   - Ou vá em DevTools → Network → Disable cache

2. **Firefox:**
   - Pressione `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac)
   - Ou vá em DevTools → Network → Disable cache

### 2. Limpar Cache do Vue.js

1. **Parar o servidor de desenvolvimento:**
```bash
# Pressione Ctrl + C no terminal
```

2. **Limpar cache do npm:**
```bash
npm cache clean --force
```

3. **Remover node_modules e reinstalar:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

4. **Reiniciar o servidor:**
```bash
npm run serve
```

### 3. Verificar Configuração

Após reiniciar, verifique no console do navegador se aparecem os logs:

```
🔧 API Config - Ambiente: development
🔧 API Config - Base URL: http://localhost:8000/api
🚀 ApiService - Base URL configurada: http://localhost:8000/api
```

### 4. Testar Conexão

1. **Verificar se o Laravel está rodando:**
```bash
# No terminal do backend
php artisan serve
```

2. **Testar endpoint diretamente:**
```bash
curl http://localhost:8000/api/csrf-token
```

### 5. Verificar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto frontend:

```env
VUE_APP_API_BASE_URL=http://localhost:8000/api
VUE_APP_API_URL=http://localhost:8000
NODE_ENV=development
```

### 6. Forçar Recarregamento

Se ainda não funcionar, adicione um parâmetro de versão na URL:

```javascript
// Em src/config/api.js
baseURL: `http://localhost:8000/api?v=${Date.now()}`,
```

## Logs de Debug

Os logs de debug foram adicionados para identificar o problema:

- `🔧 API Config` - Configuração da API
- `🚀 ApiService` - Configuração do serviço
- `📤 ApiService POST` - Requisições POST
- `📝 AuthService` - Operações de autenticação

## Endpoints Corretos

- **Login:** `POST http://localhost:8000/api/login`
- **Registro:** `POST http://localhost:8000/api/users`
- **Logout:** `POST http://localhost:8000/api/logout`

## Se o Problema Persistir

1. Verifique se não há outros arquivos de configuração
2. Verifique se não há imports de arquivos antigos
3. Verifique se o Laravel está rodando na porta 8000
4. Verifique se o CORS está configurado corretamente 