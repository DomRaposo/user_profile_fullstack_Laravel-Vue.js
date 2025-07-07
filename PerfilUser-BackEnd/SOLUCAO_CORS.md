# 🔧 Solução para Problema de CORS

## Problema Identificado

O erro `Access to XMLHttpRequest at 'http://localhost:8000/api/users' from origin 'http://localhost:8082' has been blocked by CORS policy` indica que o Laravel não está aceitando requisições do frontend na porta 8082.

## Soluções Implementadas

### 1. Configuração CORS Atualizada

O arquivo `config/cors.php` foi atualizado para incluir a porta 8082:

```php
'allowed_origins' => [
    'http://localhost:8080',
    'http://localhost:8082',  // ✅ Adicionado
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8082',  // ✅ Adicionado
    'http://127.0.0.1:3000'
],
```

### 2. Middleware CORS Personalizado

Criado `app/Http/Middleware/CorsMiddleware.php` para garantir que o CORS funcione corretamente.

### 3. Middleware Registrado

O middleware foi registrado no `app/Http/Kernel.php`.

## Passos para Aplicar as Mudanças

### 1. Reiniciar o Servidor Laravel

```bash
# Parar o servidor (Ctrl + C)
# Reiniciar
php artisan serve
```

### 2. Limpar Cache do Laravel

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### 3. Verificar se o CORS está Funcionando

Teste com curl:

```bash
curl -X OPTIONS http://localhost:8000/api/users \
  -H "Origin: http://localhost:8082" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

### 4. Testar Requisição POST

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:8082" \
  -d '{"name":"Teste","email":"teste@teste.com","password":"123456"}'
```

## Configurações Alternativas

### Opção 1: Permitir Todas as Origens (Desenvolvimento)

Se ainda houver problemas, você pode permitir todas as origens temporariamente:

```php
// Em config/cors.php
'allowed_origins' => ['*'],
```

### Opção 2: Configurar no .env

Adicione no arquivo `.env`:

```env
CORS_ALLOWED_ORIGINS=http://localhost:8080,http://localhost:8082,http://127.0.0.1:8080,http://127.0.0.1:8082
```

### Opção 3: Configurar no Apache/Nginx

Se estiver usando Apache ou Nginx, adicione os headers CORS diretamente no servidor web.

## Verificação

Após aplicar as mudanças, verifique no console do navegador se:

1. ✅ Não há mais erros de CORS
2. ✅ As requisições são enviadas com sucesso
3. ✅ O Laravel responde corretamente

## Logs de Debug

Para verificar se o CORS está funcionando, adicione logs no middleware:

```php
// Em CorsMiddleware.php
\Log::info('CORS Request', [
    'origin' => $request->header('Origin'),
    'method' => $request->method(),
    'url' => $request->url()
]);
```

## Se o Problema Persistir

1. Verifique se o Laravel está rodando na porta 8000
2. Verifique se não há firewall bloqueando
3. Verifique se o middleware está sendo executado
4. Teste com Postman ou Insomnia
5. Verifique os logs do Laravel em `storage/logs/laravel.log` 