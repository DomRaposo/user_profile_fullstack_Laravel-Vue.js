# Perfil User - Sistema Completo

Sistema de gerenciamento de usuários desenvolvido com **Laravel** (Backend) e **Vue.js** (Frontend).

## 📁 Estrutura do Projeto

```
user_profile_fullstack 2 Laravel/
├── PerfilUser-BackEnd/         # Backend (Laravel)
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/    # Controladores (Auth, User, etc)
│   │   │   ├── Middleware/     # Middlewares
│   │   │   └── Requests/       # Form Requests
│   │   ├── Models/             # Modelos Eloquent
│   │   ├── Services/           # Serviços de negócio
│   │   ├── Repositories/       # Repositórios de dados
│   │   └── Providers/          # Providers do Laravel
│   ├── routes/                 # Rotas (api.php, web.php, etc)
│   ├── database/               # Migrations, seeders, factories
│   ├── config/                 # Configurações do Laravel
│   ├── public/                 # Document root (index.php)
│   ├── resources/              # Views, assets, etc
│   ├── tests/                  # Testes automatizados
│   └── .env                    # Configuração de ambiente
│
├── PerfilUser-FrontEnd/        # Frontend (Vue.js)
│   └── perfil-user-front/
│       ├── src/
│       │   ├── components/     # Componentes Vue
│       │   ├── views/          # Páginas/Views
│       │   ├── services/       # Serviços de API
│       │   ├── config/         # Configurações
│       │   ├── utils/          # Utilitários
│       │   └── assets/         # Imagens, CSS, etc
│       ├── public/             # index.html, favicon, etc
│       └── package.json        # Dependências do frontend
│
└── README.md                   # Documentação principal do projeto
```

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
- ✅ Arquitetura em camadas (Controllers, Services, Repositories)

### Frontend (Vue.js)

- ✅ Interface moderna e responsiva
- ✅ Login e registro de usuários
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento completo de usuários
- ✅ Sistema de notificações
- ✅ Autenticação automática
- ✅ Componentes reutilizáveis

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
```sql
CREATE TABLE users (
    id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    age INT(11) NOT NULL,
    street VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    biography TEXT NULL,
    profile_image VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

## 🏛️ Arquitetura em Camadas

### Backend (Laravel)

#### Controllers
- **UserController.php** - Controlador principal para operações de usuários
- **AuthController.php** - Controlador para autenticação

#### Services
- **UserService.php** - Lógica de negócio para usuários
- **AuthService.php** - Lógica de negócio para autenticação

#### Repositories
- **UserRepository.php** - Acesso a dados e operações do banco

#### Models
- **User.php** - Modelo Eloquent com relacionamentos e mutators

### Frontend (Vue.js)

#### Components
- **Header.vue** - Cabeçalho da aplicação
- **Footer.vue** - Rodapé da aplicação
- **ModalUserForm.vue** - Formulário para criar/editar usuários
- **ModalUserView.vue** - Visualização detalhada de usuários
- **UserList.vue** - Lista de usuários com ações

#### Views
- **Login.vue** - Página de login e registro
- **Dashboard** - Área principal da aplicação

#### Services
- **ApiService.js** - Cliente HTTP centralizado
- **AuthService.js** - Serviço de autenticação
- **UserService.js** - Serviço de usuários

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

5. **Erro PDO - Campo sem valor padrão:**
   - Verificar se todos os campos obrigatórios estão sendo enviados
   - Verificar se a estrutura do banco corresponde ao modelo

## 📝 Logs

### Backend
Os logs do Laravel ficam em `storage/logs/laravel.log`

### Frontend
Ativar logs de debug em `src/config/api.js`:
```javascript
debug: true
```

## 📚 Documentação Adicional

- **CONFIGURACAO_BANCO.md** - Guia detalhado de configuração do banco
- **CONFIGURAR_BANCO_PROJ2.md** - Configurações específicas do projeto
- **SOLUCAO_CORS.md** - Soluções para problemas de CORS
- **SOLUCAO_CACHE.md** - Soluções para problemas de cache

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