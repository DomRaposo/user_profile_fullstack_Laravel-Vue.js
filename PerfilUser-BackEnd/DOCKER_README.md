# 🐳 Laravel Backend - Docker Setup

Este projeto está configurado para rodar com Docker, incluindo PHP 8.2-FPM, Nginx e Supervisor.

## 📋 Pré-requisitos

- Docker Desktop instalado e rodando
- Docker Compose instalado
- Git

## 🚀 Início Rápido

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd PerfilUser-BackEnd
```

### 2. Configure o ambiente
```bash
# Copie o arquivo de ambiente
cp .env.example .env

# Edite as configurações do banco de dados no .env
# DB_HOST=easypanel.carlosvinicius.xyz
# DB_PORT=1212
# DB_DATABASE=user
# DB_USERNAME=mysql
# DB_PASSWORD=admin
```

### 3. Execute o build
```bash
# No Windows (PowerShell)
./build.sh

# Ou manualmente:
docker-compose build --no-cache
docker-compose up -d
```

### 4. Acesse a aplicação
- 🌐 **Laravel Backend**: http://localhost:8000
- 📊 **Logs**: `docker-compose logs -f`

## 🏗️ Arquitetura

### Containers
- **laravel-backend**: PHP 8.2-FPM + Nginx + Supervisor
- **redis**: Cache Redis (opcional)

### Serviços
- **PHP-FPM**: Processamento PHP
- **Nginx**: Servidor web
- **Supervisor**: Gerenciamento de processos

## 🔧 Comandos Úteis

### Build e Deploy
```bash
# Build completo
./build.sh

# Build com limpeza
./build.sh --clean

# Build manual
docker-compose build --no-cache
docker-compose up -d
```

### Gerenciamento de Containers
```bash
# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f
docker-compose logs laravel-backend

# Parar
docker-compose down

# Reiniciar
docker-compose restart

# Remover tudo
docker-compose down --volumes --remove-orphans
```

### Acesso ao Container
```bash
# Acessar bash
docker-compose exec laravel-backend bash

# Executar comandos Laravel
docker-compose exec laravel-backend php artisan migrate
docker-compose exec laravel-backend php artisan cache:clear

# Ver status do Supervisor
docker-compose exec laravel-backend supervisorctl status
```

## 📁 Estrutura de Arquivos

```
PerfilUser-BackEnd/
├── Dockerfile                 # Configuração da imagem Docker
├── docker-compose.yml         # Orquestração dos containers
├── docker-entrypoint.sh       # Script de inicialização
├── build.sh                   # Script de build automatizado
├── .dockerignore              # Arquivos ignorados no build
├── docker/                    # Configurações Docker
│   ├── nginx/
│   │   ├── nginx.conf         # Configuração principal do Nginx
│   │   └── default.conf       # Configuração do site
│   ├── php-fpm/
│   │   └── www.conf           # Configuração PHP-FPM
│   └── supervisor/
│       └── supervisord.conf   # Configuração do Supervisor
└── .env                       # Variáveis de ambiente
```

## ⚙️ Configurações

### PHP
- **Versão**: 8.2-FPM
- **Memory Limit**: 512M
- **Max Execution Time**: 300s
- **Upload Max Filesize**: 64M
- **OPcache**: Habilitado e otimizado

### Nginx
- **Porta**: 80 (mapeada para 8000)
- **Gzip**: Habilitado
- **Security Headers**: Configurados
- **Static Files**: Cache otimizado

### Banco de Dados
- **Host**: easypanel.carlosvinicius.xyz
- **Porta**: 1212
- **Database**: user
- **Username**: mysql
- **Password**: admin

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Porta 8000 já em uso
```bash
# Verificar o que está usando a porta
netstat -ano | findstr :8000

# Ou alterar a porta no docker-compose.yml
ports:
  - "8001:80"  # Muda para porta 8001
```

#### 2. Erro de permissão
```bash
# Dentro do container
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache
```

#### 3. Cache do Laravel
```bash
docker-compose exec laravel-backend php artisan config:clear
docker-compose exec laravel-backend php artisan cache:clear
docker-compose exec laravel-backend php artisan route:clear
docker-compose exec laravel-backend php artisan view:clear
```

#### 4. Logs de erro
```bash
# Ver logs do Nginx
docker-compose exec laravel-backend tail -f /var/log/nginx/error.log

# Ver logs do PHP-FPM
docker-compose exec laravel-backend tail -f /var/log/php-fpm/error.log

# Ver logs do Supervisor
docker-compose exec laravel-backend tail -f /var/log/supervisor/supervisord.log
```

### Verificação de Saúde
```bash
# Testar conexão com banco
docker-compose exec laravel-backend php artisan db:monitor

# Verificar status dos serviços
docker-compose exec laravel-backend supervisorctl status

# Testar Nginx
docker-compose exec laravel-backend nginx -t

# Testar PHP-FPM
docker-compose exec laravel-backend php-fpm -t
```

## 📊 Monitoramento

### Recursos do Sistema
```bash
# Ver uso de recursos
docker stats

# Ver processos dentro do container
docker-compose exec laravel-backend ps aux
```

### Logs em Tempo Real
```bash
# Todos os logs
docker-compose logs -f

# Logs específicos
docker-compose logs -f laravel-backend
```

## 🔒 Segurança

### Configurações de Segurança
- Headers de segurança configurados no Nginx
- Acesso negado a arquivos sensíveis (.env, logs, etc.)
- OPcache habilitado para performance
- Timezone configurado para UTC

### Boas Práticas
- Sempre use `.env` para configurações sensíveis
- Não commite arquivos `.env` no Git
- Use volumes para persistir dados importantes
- Mantenha as imagens atualizadas

## 🚀 Deploy em Produção

### Preparação
```bash
# Build para produção
docker-compose -f docker-compose.prod.yml build

# Configurar variáveis de produção
# APP_ENV=production
# APP_DEBUG=false
# CACHE_DRIVER=redis
# SESSION_DRIVER=redis
```

### Comandos de Deploy
```bash
# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Verificar status
docker-compose -f docker-compose.prod.yml ps

# Logs
docker-compose -f docker-compose.prod.yml logs -f
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs: `docker-compose logs`
2. Teste a conexão com o banco
3. Verifique as configurações no `.env`
4. Consulte a seção de troubleshooting

---

**Desenvolvido com ❤️ usando Laravel + Docker** 