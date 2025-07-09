#!/bin/bash

# Script de inicialização do Laravel no Docker com PHP-FPM e Nginx

set -e

echo "🚀 Iniciando Laravel Backend com PHP 8.2-FPM..."

# Gerar chave da aplicação se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
fi

# Gerar chave da aplicação
echo "🔑 Gerando chave da aplicação..."
php artisan key:generate --force

# Limpar caches
echo "🧹 Limpando caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Aguardar conexão com o banco de dados (máximo 30 tentativas)
echo "⏳ Aguardando conexão com o banco de dados..."
for i in {1..30}; do
    if php artisan db:monitor --timeout=5 > /dev/null 2>&1; then
        echo "✅ Conexão com banco de dados estabelecida!"
        break
    else
        echo "📡 Tentativa $i/30: Tentando conectar ao banco de dados..."
        sleep 2
    fi
    
    if [ $i -eq 30 ]; then
        echo "⚠️ Não foi possível conectar ao banco de dados após 30 tentativas."
        echo "🔄 Continuando sem conexão com banco..."
    fi
done

# Executar migrations se a conexão estiver disponível
if php artisan db:monitor --timeout=5 > /dev/null 2>&1; then
    echo "🗄️ Executando migrations..."
    php artisan migrate --force
else
    echo "⚠️ Pulando migrations - banco de dados não disponível"
fi

# Otimizar para produção
echo "⚡ Otimizando para produção..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Definir permissões
echo "🔐 Definindo permissões..."
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html/storage
chmod -R 755 /var/www/html/bootstrap/cache
chmod -R 755 /var/www/html/public

# Criar diretórios de log se não existirem
echo "📁 Criando diretórios de log..."
mkdir -p /var/log/nginx /var/log/php-fpm /var/log/supervisor
chown -R www-data:www-data /var/log/nginx /var/log/php-fpm /var/log/supervisor

# Verificar configurações
echo "🔍 Verificando configurações..."
nginx -t
php-fpm -t

echo "🎉 Laravel Backend com PHP 8.2-FPM iniciado com sucesso!"
echo "🌐 Acesse: http://localhost:8000"
echo "📊 Nginx e PHP-FPM gerenciados pelo Supervisor"

# Executar comando passado como argumento
exec "$@" 