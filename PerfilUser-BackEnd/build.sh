#!/bin/bash

# Script de build para Laravel Backend com PHP 8.2-FPM

set -e

echo "🐳 Iniciando build do Laravel Backend com PHP 8.2-FPM..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    error "Docker não está rodando. Inicie o Docker e tente novamente."
    exit 1
fi

# Parar containers existentes
log "🛑 Parando containers existentes..."
docker-compose down

# Remover imagens antigas (opcional)
if [ "$1" = "--clean" ]; then
    log "🧹 Removendo imagens antigas..."
    docker-compose down --rmi all --volumes --remove-orphans
fi

# Construir imagens
log "🔨 Construindo imagens Docker..."
docker-compose build --no-cache

# Verificar se o build foi bem-sucedido
if [ $? -eq 0 ]; then
    log "✅ Build concluído com sucesso!"
else
    error "❌ Erro durante o build. Verifique os logs acima."
    exit 1
fi

# Iniciar containers
log "🚀 Iniciando containers..."
docker-compose up -d

# Aguardar containers ficarem prontos
log "⏳ Aguardando containers ficarem prontos..."
sleep 10

# Verificar status dos containers
log "📊 Verificando status dos containers..."
docker-compose ps

# Verificar logs
log "📋 Últimos logs do Laravel Backend:"
docker-compose logs --tail=20 laravel-backend

# Verificar se os serviços estão rodando
log "🔍 Verificando serviços..."
if docker-compose exec laravel-backend supervisorctl status > /dev/null 2>&1; then
    log "✅ Supervisor está rodando"
    docker-compose exec laravel-backend supervisorctl status
else
    warn "⚠️ Supervisor ainda não está pronto, aguarde alguns segundos..."
fi

# Informações finais
echo ""
log "🎉 Build e deploy concluídos!"
echo ""
echo "📱 URLs de acesso:"
echo "   🌐 Laravel Backend: http://localhost:8000"
echo "   🗄️ phpMyAdmin: http://localhost:8080"
echo "   📊 MySQL: localhost:3306"
echo "   🔴 Redis: localhost:6379"
echo ""
echo "🔧 Comandos úteis:"
echo "   📋 Ver logs: docker-compose logs -f"
echo "   🛑 Parar: docker-compose down"
echo "   🔄 Reiniciar: docker-compose restart"
echo "   🐛 Debug: docker-compose exec laravel-backend bash"
echo ""
echo "📊 Monitoramento:"
echo "   📈 Status: docker-compose ps"
echo "   📊 Recursos: docker stats"
echo "   🔍 Supervisor: docker-compose exec laravel-backend supervisorctl status" 