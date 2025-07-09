#!/bin/bash

# Script de build e deploy do Laravel Backend com Docker

set -e

echo "🚀 Iniciando build do Laravel Backend..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    error "Docker não está instalado!"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose não está instalado!"
    exit 1
fi

# Parar containers existentes
log "🛑 Parando containers existentes..."
docker-compose down --remove-orphans

# Remover imagens antigas (opcional)
if [ "$1" = "--clean" ]; then
    log "🧹 Removendo imagens antigas..."
    docker-compose down --rmi all --volumes --remove-orphans
fi

# Build da imagem
log "🔨 Construindo imagem Docker..."
docker-compose build --no-cache

# Iniciar containers
log "🚀 Iniciando containers..."
docker-compose up -d

# Aguardar containers estarem prontos
log "⏳ Aguardando containers estarem prontos..."
sleep 10

# Verificar status dos containers
log "🔍 Verificando status dos containers..."
docker-compose ps

# Verificar logs
log "📋 Logs dos containers:"
docker-compose logs --tail=20

# Testar conexão com a aplicação
log "🧪 Testando conexão com a aplicação..."
for i in {1..30}; do
    if curl -f http://localhost:8000 > /dev/null 2>&1; then
        log "✅ Aplicação está respondendo em http://localhost:8000"
        break
    else
        warn "Tentativa $i/30: Aplicação ainda não está respondendo..."
        sleep 2
    fi
    
    if [ $i -eq 30 ]; then
        error "Aplicação não está respondendo após 30 tentativas"
        docker-compose logs
        exit 1
    fi
done

log "🎉 Build concluído com sucesso!"
log "🌐 Acesse: http://localhost:8000"
log "📊 Para ver logs: docker-compose logs -f"
log "🛑 Para parar: docker-compose down" 