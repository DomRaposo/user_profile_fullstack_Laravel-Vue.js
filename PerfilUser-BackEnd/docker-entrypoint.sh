#!/bin/bash

# Script de inicialização do Laravel no Docker

set -e

echo "🚀 Iniciando Laravel Backend..."

# Aguardar conexão com o banco de dados
echo "⏳ Aguardando conexão com o banco de dados..."
while ! php artisan db:monitor --timeout=5 > /dev/null 2>&1; do
    echo "📡 Tentando conectar ao banco de dados..."
    sleep 2
done
echo "✅ Conexão com banco de dados estabelecida!"

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

# Executar migrations
echo "🗄️ Executando migrations..."
php artisan migrate --force

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

echo "🎉 Laravel Backend iniciado com sucesso!"
echo "🌐 Acesse: http://localhost:8000"

# Executar comando passado como argumento
exec "$@" 