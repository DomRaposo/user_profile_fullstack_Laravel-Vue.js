# 🔧 Configuração do Banco de Dados - XAMPP

## Problema Identificado

O erro `Access denied for user 'forge'@'localhost'` indica que o Laravel está tentando conectar com credenciais incorretas.

## Solução

### 1. Criar Arquivo .env

Crie um arquivo `.env` na raiz do projeto Laravel (`PerfilUser-BackEnd/.env`) com o seguinte conteúdo:

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
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=perfil_user_db
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:8080,http://localhost:8082,http://127.0.0.1:8080,http://127.0.0.1:8082
```

### 2. Configurar Banco de Dados

#### 2.1. Iniciar XAMPP
- Abra o XAMPP Control Panel
- Inicie o Apache e MySQL
- Clique em "Admin" do MySQL (ou acesse http://localhost/phpmyadmin)

#### 2.2. Criar Banco de Dados
No phpMyAdmin:
1. Clique em "Novo" no menu lateral
2. Nome do banco: `perfil_user_db`
3. Collation: `utf8mb4_unicode_ci`
4. Clique em "Criar"

Ou execute no SQL:
```sql
CREATE DATABASE perfil_user_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configurar Laravel

#### 3.1. Gerar Chave da Aplicação
```bash
cd PerfilUser-BackEnd
php artisan key:generate
```

#### 3.2. Executar Migrations
```bash
php artisan migrate
```

#### 3.3. Limpar Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### 4. Verificar Configuração

#### 4.1. Testar Conexão
```bash
php artisan tinker
```
No tinker, execute:
```php
DB::connection()->getPdo();
```
Se retornar um objeto PDO, a conexão está funcionando.

#### 4.2. Verificar Tabelas
```bash
php artisan migrate:status
```

### 5. Configurações Alternativas

#### Se o MySQL tiver senha:
```env
DB_PASSWORD=sua_senha_aqui
```

#### Se usar porta diferente:
```env
DB_PORT=3307
```

#### Se usar host diferente:
```env
DB_HOST=localhost
```

### 6. Troubleshooting

#### Erro: "Access denied for user 'root'@'localhost'"
1. Verifique se o MySQL está rodando
2. Verifique se o usuário 'root' existe
3. Verifique se não há senha para o root

#### Erro: "Unknown database 'perfil_user_db'"
1. Crie o banco de dados no phpMyAdmin
2. Verifique se o nome está correto no .env

#### Erro: "Connection refused"
1. Verifique se o MySQL está rodando no XAMPP
2. Verifique se a porta 3306 está correta
3. Verifique se não há firewall bloqueando

### 7. Comandos Úteis

```bash
# Verificar status das migrations
php artisan migrate:status

# Reverter todas as migrations
php artisan migrate:reset

# Executar migrations novamente
php artisan migrate

# Criar seeders (dados de teste)
php artisan db:seed

# Verificar configuração do banco
php artisan config:show database
```

### 8. Estrutura Esperada

Após executar as migrations, você deve ter as seguintes tabelas:
- `users` - Tabela de usuários
- `password_reset_tokens` - Tokens de reset de senha
- `failed_jobs` - Jobs que falharam
- `personal_access_tokens` - Tokens do Sanctum
- `migrations` - Controle de migrations

## Próximos Passos

Após configurar o banco de dados:
1. Teste o registro de usuários
2. Teste o login
3. Verifique se os dados estão sendo salvos no banco 