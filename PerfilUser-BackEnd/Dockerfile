# Dockerfile simplificado para Laravel (EasyPanel e local)
FROM php:8.2-fpm

# Instala dependências do sistema e extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www

# Copia os arquivos do projeto
COPY . .

# Garante que o .env exista
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Garante que storage, bootstrap/cache, storage/framework/views e resources/views existam e estejam com permissão
RUN mkdir -p storage bootstrap/cache storage/framework/views resources/views \
    && chown -R www-data:www-data storage bootstrap/cache storage/framework/views resources/views \
    && chmod -R 755 storage bootstrap/cache storage/framework/views resources/views

# Instala dependências do PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Gera chave da aplicação e prepara caches
RUN php artisan key:generate --force \
    && php artisan config:clear \
    && php artisan cache:clear \
    && php artisan route:clear \
    && php artisan view:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Permissões finais para storage e cache
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage /var/www/bootstrap/cache

# Expõe a porta padrão do PHP-FPM
EXPOSE 9000

# Comando padrão para iniciar o PHP-FPM
CMD ["php-fpm"] 