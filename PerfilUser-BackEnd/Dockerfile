# Dockerfile para Laravel Backend com PHP 8.2-FPM
FROM php:8.2-fpm

# Definir variáveis de ambiente
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV PHP_MEMORY_LIMIT=512M
ENV PHP_MAX_EXECUTION_TIME=300
ENV PHP_UPLOAD_MAX_FILESIZE=64M
ENV PHP_POST_MAX_SIZE=64M

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    nginx \
    supervisor \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && docker-php-ext-enable pdo_mysql mbstring exif pcntl bcmath gd zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Configurar PHP-FPM
RUN echo "memory_limit = ${PHP_MEMORY_LIMIT}" >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini \
    && echo "max_execution_time = ${PHP_MAX_EXECUTION_TIME}" >> /usr/local/etc/php/conf.d/docker-php-max-execution-time.ini \
    && echo "upload_max_filesize = ${PHP_UPLOAD_MAX_FILESIZE}" >> /usr/local/etc/php/conf.d/docker-php-upload.ini \
    && echo "post_max_size = ${PHP_POST_MAX_SIZE}" >> /usr/local/etc/php/conf.d/docker-php-upload.ini \
    && echo "date.timezone = UTC" >> /usr/local/etc/php/conf.d/docker-php-timezone.ini

# Copiar configuração do PHP-FPM
COPY docker/php-fpm/www.conf /usr/local/etc/php-fpm.d/www.conf

# Configurar Nginx
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/sites-available/default
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default \
    && rm -f /etc/nginx/sites-enabled/default

# Configurar Supervisor
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar código da aplicação primeiro
COPY . .

# Instalar dependências do PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Definir permissões
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache \
    && chmod -R 755 /var/www/html/public

# Criar diretórios necessários
RUN mkdir -p /var/log/nginx /var/log/php-fpm /var/log/supervisor

# Expor porta 80
EXPOSE 80

# Script de inicialização
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"] 