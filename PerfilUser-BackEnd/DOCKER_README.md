# 🐳 Docker para Laravel Backend - Perfil User

Este documento contém instruções para executar o backend Laravel usando Docker.

## 📋 Pré-requisitos

- Docker
- Docker Compose
- Git

## 🚀 Início Rápido

### 1. Clonar o repositório
```bash
git clone <repository-url>
cd PerfilUser-BackEnd
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com as configurações do Docker:
```env
APP_NAME="Perfil User"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=perfil_user_db
DB_USERNAME=perfil_user
DB_PASSWORD=perfil_user_password

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### 3. Construir e executar containers
```bash
# Construir as imagens
docker-compose build

# Executar os containers
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### 4. Acessar a aplicação
- **Laravel Backend:** http://localhost:8000
- **phpMyAdmin:** http://localhost:8080
- **MySQL:** localhost:3306
- **Redis:** localhost:6379

## 🔧 Comandos Úteis

### Executar comandos Laravel
```bash
# Acessar container do Laravel
docker-compose exec laravel-backend bash

# Executar migrations
docker-compose exec laravel-backend php artisan migrate

# Executar seeders
docker-compose exec laravel-backend php artisan db:seed

# Limpar cache
docker-compose exec laravel-backend php artisan cache:clear

# Gerar chave da aplicação
docker-compose exec laravel-backend php artisan key:generate

# Listar rotas
docker-compose exec laravel-backend php artisan route:list
```

### Gerenciar containers
```bash
# Parar containers
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Reconstruir containers
docker-compose up --build

# Ver status dos containers
docker-compose ps

# Ver logs de um serviço específico
docker-compose logs laravel-backend
docker-compose logs mysql
docker-compose logs redis
```

### Acessar banco de dados
```bash
# Acessar MySQL via linha de comando
docker-compose exec mysql mysql -u perfil_user -p perfil_user_db

# Acessar Redis
docker-compose exec redis redis-cli
```

## 🗄️ Banco de Dados

### Credenciais
- **Host:** mysql
- **Porta:** 3306
- **Database:** perfil_user_db
- **Usuário:** perfil_user
- **Senha:** perfil_user_password

### Estrutura da Tabela Users
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

## 🔐 Autenticação

### Usuário Padrão
- **Email:** admin@perfiluser.com
- **Senha:** password

## 🌐 Endpoints da API

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

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de permissão**
```bash
# Corrigir permissões
docker-compose exec laravel-backend chown -R www-data:www-data /var/www/html
docker-compose exec laravel-backend chmod -R 755 /var/www/html/storage
```

2. **Erro de conexão com banco**
```bash
# Verificar se o MySQL está rodando
docker-compose ps mysql

# Ver logs do MySQL
docker-compose logs mysql
```

3. **Erro de cache**
```bash
# Limpar todos os caches
docker-compose exec laravel-backend php artisan config:clear
docker-compose exec laravel-backend php artisan cache:clear
docker-compose exec laravel-backend php artisan route:clear
docker-compose exec laravel-backend php artisan view:clear
```

4. **Erro de CORS**
- Verificar se o frontend está configurado para acessar `http://localhost:8000`
- Verificar configurações no `config/cors.php`

### Logs
```bash
# Ver logs do Laravel
docker-compose logs laravel-backend

# Ver logs do Apache
docker-compose exec laravel-backend tail -f /var/log/apache2/error.log

# Ver logs do MySQL
docker-compose logs mysql
```

## 🔄 Desenvolvimento

### Modo de Desenvolvimento
Para desenvolvimento, os volumes estão mapeados para permitir edição em tempo real:

```yaml
volumes:
  - .:/var/www/html
  - ./storage:/var/www/html/storage
  - ./bootstrap/cache:/var/www/html/bootstrap/cache
```

### Hot Reload
As mudanças no código são refletidas automaticamente. Para aplicar mudanças de configuração:

```bash
docker-compose exec laravel-backend php artisan config:cache
```

## 🚀 Produção

### Build para Produção
```bash
# Construir imagem otimizada
docker build -t perfil-user-backend:production .

# Executar em produção
docker run -d -p 8000:80 --env-file .env.production perfil-user-backend:production
```

### Variáveis de Ambiente de Produção
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
DB_HOST=your-db-host
DB_PASSWORD=your-secure-password
```

## 📊 Monitoramento

### Health Check
```bash
# Verificar saúde dos containers
docker-compose ps

# Verificar recursos
docker stats
```

### Backup do Banco
```bash
# Backup
docker-compose exec mysql mysqldump -u perfil_user -p perfil_user_db > backup.sql

# Restore
docker-compose exec -T mysql mysql -u perfil_user -p perfil_user_db < backup.sql
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Teste com Docker
4. Commit suas mudanças
5. Push para a branch
6. Abra um Pull Request

---

**Desenvolvido com ❤️ usando Laravel e Docker** 