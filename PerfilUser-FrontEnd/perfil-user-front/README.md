# Perfil User - Frontend Vue.js

Frontend do sistema de gerenciamento de usuários desenvolvido em Vue.js que consome a API Laravel.

## 🚀 Configuração e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Backend Laravel rodando na porta 8000

### Instalação

1. **Instalar dependências:**
```bash
npm install
# ou
yarn install
```

2. **Configurar variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto (se não existir):
```env
VUE_APP_API_BASE_URL=http://localhost:8000/api
VUE_APP_API_URL=http://localhost:8000
```

3. **Executar o projeto:**
```bash
npm run serve
# ou
yarn serve
```

O projeto estará disponível em `http://localhost:8080`

## 🔧 Configuração da API

O projeto está configurado para consumir a API Laravel na porta 8000. As configurações principais estão em:

- `src/config/api.js` - Configuração centralizada da API
- `src/services/ApiService.js` - Service principal para requisições HTTP
- `src/services/AuthService.js` - Service de autenticação
- `src/services/UserService.js` - Service de gerenciamento de usuários

### Endpoints Configurados

- **Autenticação:**
  - Login: `POST /api/login`
  - Logout: `POST /api/logout`
  - CSRF Token: `GET /api/csrf-token`

- **Usuários:**
  - Listar: `GET /api/users`
  - Criar: `POST /api/users`
  - Visualizar: `GET /api/users/{id}`
  - Atualizar: `PUT /api/users/{id}`
  - Deletar: `DELETE /api/users/{id}`

## 🏗️ Estrutura do Projeto

```
perfil-user-front/
├── src/
│   ├── components/
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   ├── ModalUserForm.vue
│   │   ├── ModalUserView.vue
│   │   └── UserList.vue
│   ├── views/
│   │   └── Login.vue
│   ├── services/
│   │   ├── ApiService.js
│   │   ├── AuthService.js
│   │   ├── UserService.js
│   │   └── index.js
│   ├── config/
│   │   └── api.js
│   ├── utils/
│   │   └── auth.js
│   ├── assets/
│   │   ├── logo.png
│   │   └── tailwind.css
│   ├── App.vue
│   ├── main.js
│   └── axios.js
├── public/
│   ├── favicon.ico
│   └── index.html
├── package.json
├── vue.config.js
└── README.md
```

## 🔐 Autenticação

O sistema utiliza Laravel Sanctum para autenticação:

1. **Login:** O usuário faz login com email e senha
2. **Token:** O Laravel retorna um token JWT
3. **Requisições:** O token é enviado automaticamente no header `Authorization`
4. **Logout:** O token é invalidado no servidor

## 📱 Funcionalidades

- ✅ Login e registro de usuários
- ✅ Dashboard com estatísticas
- ✅ Listagem de usuários
- ✅ Criação de novos usuários
- ✅ Edição de usuários existentes
- ✅ Visualização detalhada de usuários
- ✅ Exclusão de usuários
- ✅ Sistema de notificações
- ✅ Interface responsiva

## 🎨 Tecnologias Utilizadas

- **Vue.js 2** - Framework JavaScript
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Laravel Sanctum** - Autenticação

## 🔧 Desenvolvimento

### Comandos Úteis

```bash
# Executar em modo desenvolvimento
npm run serve

# Build para produção
npm run build

# Linting
npm run lint

# Fix linting
npm run lint --fix
```

### Debug

Para ativar logs de debug da API, verifique a configuração em `src/config/api.js`:

```javascript
debug: true // Em desenvolvimento
```

## 🚀 Deploy

1. **Build para produção:**
```bash
npm run build
```

2. **Configurar variáveis de ambiente de produção:**
```env
VUE_APP_API_BASE_URL=https://seu-dominio.com/api
VUE_APP_API_URL=https://seu-dominio.com
```

3. **Servir os arquivos estáticos** gerados na pasta `dist/`

## 📝 Notas Importantes

- O frontend está configurado para consumir a API Laravel na porta 8000
- Certifique-se de que o backend Laravel esteja rodando antes de iniciar o frontend
- O CORS está configurado no Laravel para aceitar requisições do frontend
- A autenticação utiliza Laravel Sanctum com tokens JWT

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
