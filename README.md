# 👤 Sistema de Gerenciamento de Perfis de Usuários

Um sistema fullstack completo para gerenciamento de perfis de usuários, desenvolvido com **Laravel 10** no backend e **Vue.js 3** no frontend.

## 🚀 Visão Geral

Este projeto é uma aplicação web moderna que permite:
- ✅ Autenticação de usuários com Laravel Sanctum
- ✅ CRUD completo de perfis de usuários
- ✅ Interface responsiva e moderna
- ✅ API RESTful com autenticação JWT
- ✅ Deploy com Docker
- ✅ Banco de dados MySQL

## 🏗️ Arquitetura

```
user_profile_fullstack/
├── PerfilUser-BackEnd/          # API Laravel 10
│   ├── app/
│   │   ├── Http/Controllers/    # Controllers da API
│   │   ├── Models/              # Modelos Eloquent
│   │   ├── Services/            # Lógica de negócio
│   │   └── Repositories/        # Padrão Repository
│   ├── routes/api.php           # Rotas da API
│   ├── database/migrations/     # Migrations do banco
│   └── docker/                  # Configurações Docker
└── PerfilUser-FrontEnd/         # Frontend Vue.js 3
    └── perfil-user-front/
        ├── src/
        │   ├── components/      # Componentes Vue
        │   ├── services/        # Services da API
        │   ├── views/           # Páginas da aplicação
        │   └── config/          # Configurações
        └── public/              # Arquivos estáticos
```

## 🛠️ Tecnologias Utilizadas

### Backend (Laravel 10)
- **PHP 8.1+** - Linguagem de programação
- **Laravel 10** - Framework PHP
- **Laravel Sanctum** - Autenticação API
- **MySQL** - Banco de dados
- **Docker** - Containerização

### Frontend (Vue.js 3)
- **Vue.js 3** - Framework JavaScript
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **Vue CLI** - Ferramentas de desenvolvimento

## 📋 Pré-requisitos

### Para Desenvolvimento Local
- **PHP 8.1+**
- **Composer**
- **Node.js 14+**
- **npm ou yarn**
- **MySQL 5.7+**
- **Git**

### Para Docker
- **Docker Desktop**
- **Docker Compose**

## 🚀 Instalação e Configuração

### Opção 1: Desenvolvimento Local

#### 1. Clone o repositório
```bash
git clone <https://github.com/DomRaposo/user_profile_fullstack_Laravel-Vue.js>
cd user_profile_fullstack
```

#### 2. Configurar Backend (Laravel)
```bash
cd PerfilUser-BackEnd

# Instalar dependências
composer install

# Configurar ambiente
cp .env.example .env
php artisan key:generate

# Configurar banco de dados no .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=perfil_user_db_proj2
DB_USERNAME=root
DB_PASSWORD=

# Executar migrations
php artisan migrate

# Iniciar servidor
php artisan serve
```

#### 3. Configurar Frontend (Vue.js)
```bash
cd PerfilUser-FrontEnd/perfil-user-front

# Instalar dependências
npm install

# Configurar API (se necessário)
# Editar src/config/api.js para apontar para o backend

# Iniciar servidor de desenvolvimento
npm run serve
```

### Opção 2: Docker (Recomendado)

#### 1. Configurar Backend com Docker
```bash
cd PerfilUser-BackEnd

# Copiar arquivo de ambiente
cp .env.example .env

# Executar build
./build.sh

# Ou manualmente:
docker-compose build --no-cache
docker-compose up -d
```

#### 2. Configurar Frontend
```bash
cd PerfilUser-FrontEnd/perfil-user-front

# Instalar dependências
npm install

# Configurar API para Docker
# Editar src/config/api.js:
# VUE_APP_API_BASE_URL=http://localhost:8000/api

# Iniciar servidor
npm run serve
```

## 🌐 Acessos

### 🚀 Aplicação Implantada
- **🌍 Demo Online**: [https://user-profile-fullstack-laravel-vue.vercel.app/login](https://user-profile-fullstack-laravel-vue.vercel.app/login)
Clique em "Cadastrar" para criar sua conta.

Preencha todos os campos obrigatórios, como nome, e-mail, senha e etc...

Após o cadastro, faça login para acessar o sistema.

Recomendado utilizar um e-mail válido para testes.

### 🖥️ Desenvolvimento Local
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **API Health Check**: http://localhost:8000/api/health

## 📚 Endpoints da API

### Autenticação
- `POST /api/login` - Login de usuário
- `POST /api/logout` - Logout (requer autenticação)
- `GET /api/csrf-token` - Obter token CSRF

### Usuários (requer autenticação)
- `GET /api/users` - Listar todos os usuários
- `POST /api/users` - Criar novo usuário
- `GET /api/users/{id}` - Visualizar usuário específico
- `PUT /api/users/{id}` - Atualizar usuário
- `DELETE /api/users/{id}` - Deletar usuário

## 🔐 Autenticação

O sistema utiliza **Laravel Sanctum** para autenticação:

1. **Login**: Usuário faz login com email e senha
2. **Token**: Laravel retorna um token JWT
3. **Requisições**: Token é enviado automaticamente no header `Authorization`
4. **Logout**: Token é invalidado no servidor

## 📱 Funcionalidades

### Frontend
- ✅ **Login/Logout** - Sistema de autenticação
- ✅ **Dashboard** - Visão geral dos usuários
- ✅ **Listagem** - Tabela com todos os usuários
- ✅ **Criação** - Formulário para novo usuário
- ✅ **Edição** - Formulário para editar usuário
- ✅ **Visualização** - Modal com detalhes do usuário
- ✅ **Exclusão** - Confirmação antes de deletar
- ✅ **Responsivo** - Interface adaptável

### Backend
- ✅ **API RESTful** - Endpoints padronizados
- ✅ **Autenticação** - Laravel Sanctum
- ✅ **Validação** - Requests validados
- ✅ **Repository Pattern** - Separação de responsabilidades
- ✅ **Services** - Lógica de negócio isolada
- ✅ **Migrations** - Controle de versão do banco
- ✅ **CORS** - Configurado para frontend

## 🗄️ Estrutura do Banco de Dados

### Tabela `users`
- `id` - Chave primária
- `name` - Nome do usuário
- `email` - Email único
- `password` - Senha criptografada
- `profile_image` - URL da imagem de perfil
- `address` - Endereço
- `age` - Idade
- `biography` - Biografia
- `created_at` - Data de criação
- `updated_at` - Data de atualização

## 🐳 Docker

### Comandos Úteis
```bash
# Build e iniciar
./build.sh

# Ver logs
docker-compose logs -f

# Acessar container
docker-compose exec laravel-backend bash

# Executar comandos Laravel
docker-compose exec laravel-backend php artisan migrate
docker-compose exec laravel-backend php artisan cache:clear

# Parar containers
docker-compose down
```

### Configurações Docker
- **PHP 8.2-FPM** - Processamento PHP
- **Nginx** - Servidor web
- **Supervisor** - Gerenciamento de processos
- **Redis** - Cache (opcional)

## 🔧 Desenvolvimento

### Comandos Backend
```bash
# Executar migrations
php artisan migrate

# Criar migration
php artisan make:migration create_table_name

# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Gerar chave
php artisan key:generate
```

### Comandos Frontend
```bash
# Servidor de desenvolvimento
npm run serve

# Build para produção
npm run build

# Linting
npm run lint
npm run lint --fix
```

## 🚀 Deploy

### Backend (Laravel)
1. Configurar variáveis de ambiente de produção
2. Executar `composer install --optimize-autoloader --no-dev`
3. Executar `php artisan config:cache`
4. Configurar servidor web (Nginx/Apache)

### Frontend (Vue.js)
1. Executar `npm run build`
2. Servir arquivos da pasta `dist/`
3. Configurar proxy para API

## 🐛 Troubleshooting

### Problemas Comuns

#### Backend
- **Erro de conexão com banco**: Verificar configurações no `.env`
- **Erro de permissão**: `chmod -R 755 storage bootstrap/cache`
- **Cache**: `php artisan config:clear && php artisan cache:clear`

#### Frontend
- **Erro de CORS**: Verificar configuração CORS no Laravel
- **API não responde**: Verificar se backend está rodando
- **Build falha**: Verificar dependências com `npm install`

#### Docker
- **Porta ocupada**: Alterar porta no `docker-compose.yml`
- **Container não inicia**: Verificar logs com `docker-compose logs`
- **Permissões**: `chown -R www-data:www-data /var/www/html`

## 📝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 👥 Autores

- **Desenvolvedor** - [Felipe Oliveira](https://github.com/DomRaposo)

## 🙏 Agradecimentos

- Laravel Framework
- Vue.js Team
- Comunidade open source

---

**⭐ Se este projeto te ajudou, considere dar uma estrela!** 
