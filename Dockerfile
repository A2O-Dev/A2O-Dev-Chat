ARG PHP_VERSION=8.3.4
ARG NODE_VERSION=20.12.1
ARG COMPOSER_VERSION=2.7.2

FROM node:${NODE_VERSION}-alpine AS node

FROM composer:${COMPOSER_VERSION} AS composer

FROM php:${PHP_VERSION}-fpm-alpine

RUN apk add -U --no-cache \
        linux-headers \
        libpng-dev \
        libxml2-dev \
        libzip-dev \
        zip \
        curl \
        unzip \
        nginx \
        supervisor \
        $PHPIZE_DEPS \
    && docker-php-ext-configure gd \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install mysqli \
    && docker-php-ext-install zip \
    && docker-php-source delete \
    && rm -rf /etc/apk/cache/*

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

COPY docker/app/conf/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Install node
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

# Install composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

# Install composer dependencies
RUN composer install --prefer-dist --no-interaction --ignore-platform-reqs

# Install npm dependencies
RUN npm install

RUN npm install laravel-echo-server --location=global

# Set environment variables
RUN php artisan key:generate

# Setting supervisord
RUN mkdir -p /var/log/supervisor
COPY --chmod=0777 docker/app/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY --chmod=0777 docker/app/supervisor/schedule.sh /etc/supervisor/conf.d/schedule.sh

# Setting nginx
COPY --chmod=0777 docker/app/nginx/default.conf /etc/nginx/http.d/default.conf

# Setting permissions
RUN chmod 777 -R /var/www/html/storage
RUN chmod 777 -R /var/www/html/public

## Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
