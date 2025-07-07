# 🔧 Configuração do Banco de Dados - perfil_user_db_proj2

## ✅ Arquivo .env Configurado

Seu arquivo `.env` já está configurado corretamente com:
- ✅ Banco: `perfil_user_db_proj2`
- ✅ Usuário: `root`
- ✅ Senha: `vazia`
- ✅ Host: `127.0.0.1`
- ✅ Porta: `3306`

## 🚀 Próximos Passos

### 1. Verificar se o Banco Existe

Acesse http://localhost/phpmyadmin e verifique se o banco `perfil_user_db_proj2` existe.

Se não existir, crie-o:
```sql
CREATE DATABASE perfil_user_db_proj2 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Executar Comandos Laravel

```bash
cd PerfilUser-BackEnd

# Gerar chave da aplicação (importante!)
php artisan key:generate

# Limpar cache de configuração
php artisan config:clear

# Executar migrations
php artisan migrate

# Verificar status das migrations
php artisan migrate:status
```

### 3. Verificar Configuração

```bash
# Testar conexão com o banco
php artisan tinker
DB::connection()->getPdo();

# Sair do tinker
exit
```

### 4. Estrutura Esperada

Após executar as migrations, você deve ter:

- ✅ Tabela `users` com os campos:
  - `id` (PK)
  - `name`
  - `email`
  - `password`
  - `profile_image`
  - `address`
  - `age`
  - `biography`
  - `created_at`
  - `updated_at`

- ✅ Tabela `password_reset_tokens`
- ✅ Tabela `failed_jobs`
- ✅ Tabela `personal_access_tokens`
- ✅ Tabela `migrations`

### 5. Comandos Úteis

```bash
# Se precisar recriar o banco
php artisan migrate:fresh

# Se precisar reverter migrations
php artisan migrate:rollback

# Verificar configuração do banco
php artisan config:show database
```

### 6. Troubleshooting

#### Se der erro de conexão:
1. Verifique se o XAMPP está rodando
2. Verifique se o MySQL está ativo
3. Verifique se o banco `perfil_user_db_proj2` foi criado
4. Execute `php artisan config:clear`

#### Se der erro de migrations:
1. Verifique se o banco existe
2. Execute `php artisan migrate:fresh`

## 🎯 Resultado Esperado

Após executar as migrations com sucesso:
1. ✅ Banco de dados configurado
2. ✅ Tabelas criadas
3. ✅ Laravel conectando corretamente
4. ✅ Frontend conseguindo salvar usuários 