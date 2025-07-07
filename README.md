# Perfil User - Sistema Completo

Sistema de gerenciamento de usuários desenvolvido com **Laravel** (Backend) e **Vue.js** (Frontend).

## 🏗️ Arquitetura

- **Backend:** Laravel 10 com Sanctum para autenticação
- **Frontend:** Vue.js 2 com Axios para requisições HTTP
- **Banco de Dados:** MySQL/PostgreSQL
- **Autenticação:** Laravel Sanctum (JWT Tokens)

## 🚀 Configuração Completa

### Pré-requisitos

- PHP 8.1 ou superior
- Composer
- Node.js 14 ou superior
- npm ou yarn
- MySQL/PostgreSQL
- XAMPP, WAMP, ou servidor web similar

### 1. Backend Laravel

#### Configuração do Banco de Dados

1. **Criar banco de dados:**
```sql
CREATE DATABASE perfil_user_db;
```

2. **Configurar arquivo `.env`:**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=perfil_user_db
DB_USERNAME=root
DB_PASSWORD=
```

#### Instalação e Configuração

1. **Navegar para o diretório do backend:**
```bash
cd PerfilUser-BackEnd
```

2. **Instalar dependências:**
```bash
composer install
```

3. **Gerar chave da aplicação:**
```bash
php artisan key:generate
```

4. **Executar migrations:**
```bash
php artisan migrate
```

5. **Executar seeders (opcional):**
```bash
php artisan db:seed
```

6. **Iniciar servidor:**
```bash
php artisan serve
```

O backend estará disponível em `http://localhost:8000`

### 2. Frontend Vue.js

#### Instalação e Configuração

1. **Navegar para o diretório do frontend:**
```bash
cd PerfilUser-FrontEnd/perfil-user-front
```

2. **Instalar dependências:**
```bash
npm install
# ou
yarn install
```

3. **Configurar variáveis de ambiente:**
Criar arquivo `.env`:
```env
VUE_APP_API_BASE_URL=http://localhost:8000/api
VUE_APP_API_URL=http://localhost:8000
```

4. **Iniciar servidor de desenvolvimento:**
```bash
npm run serve
# ou
yarn serve
```

O frontend estará disponível em `http://localhost:8080`

## 🔧 Configurações Importantes

### CORS (Backend)

O Laravel já está configurado para aceitar requisições do frontend. Verifique o arquivo `config/cors.php`:

```php
'allowed_origins' => [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:3000'
],
'supports_credentials' => true,
```

### Sanctum (Backend)

O Laravel Sanctum está configurado para autenticação via tokens. Verifique o arquivo `config/sanctum.php`:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s%s',
    'localhost,localhost:3000,localhost:8080,127.0.0.1,127.0.0.1:8000,::1',
    Sanctum::currentApplicationUrlWithPort(),
    env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
))),
```

## 📱 Funcionalidades

### Backend (Laravel)

- ✅ Autenticação com Sanctum
- ✅ CRUD completo de usuários
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ CORS configurado
- ✅ API RESTful

### Frontend (Vue.js)

- ✅ Interface moderna e responsiva
- ✅ Login e registro de usuários
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento completo de usuários
- ✅ Sistema de notificações
- ✅ Autenticação automática

## 🔐 Endpoints da API

### Autenticação
- `POST /api/login` - Login do usuário
- `POST /api/logout` - Logout do usuário
- `GET /api/csrf-token` - Obter token CSRF

### Usuários
- `GET /api/users` - Listar todos os usuários
- `POST /api/users` - Criar novo usuário
- `GET /api/users/{id}` - Obter usuário específico
- `PUT /api/users/{id}` - Atualizar usuário
- `DELETE /api/users/{id}` - Deletar usuário

## 🗄️ Estrutura do Banco de Dados

### Tabela `users`
- `id` - ID único do usuário
- `name` - Nome completo
- `email` - Email único
- `password` - Senha criptografada
- `profile_image` - URL da imagem de perfil
- `address` - Endereço completo
- `age` - Idade
- `biography` - Biografia
- `created_at` - Data de criação
- `updated_at` - Data de atualização

## 🚀 Deploy

### Backend (Laravel)

1. **Configurar servidor web (Apache/Nginx)**
2. **Configurar variáveis de ambiente de produção**
3. **Executar `composer install --optimize-autoloader --no-dev`**
4. **Executar `php artisan config:cache`**
5. **Executar `php artisan route:cache`**

### Frontend (Vue.js)

1. **Build para produção:**
```bash
npm run build
```

2. **Configurar variáveis de ambiente de produção**
3. **Servir arquivos estáticos da pasta `dist/`**

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de CORS:**
   - Verificar configuração no `config/cors.php`
   - Verificar se o frontend está na lista de origens permitidas

2. **Erro de autenticação:**
   - Verificar se o Sanctum está configurado corretamente
   - Verificar se o token está sendo enviado no header

3. **Erro de conexão com banco:**
   - Verificar configurações no `.env`
   - Verificar se o banco de dados está rodando

4. **Erro de migration:**
   - Executar `php artisan migrate:fresh` para recriar tabelas
   - Verificar se o banco de dados existe

## 📝 Logs

### Backend
Os logs do Laravel ficam em `storage/logs/laravel.log`

### Frontend
Ativar logs de debug em `src/config/api.js`:
```javascript
debug: true
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ usando Laravel e Vue.js** 