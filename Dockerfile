FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts \
    --ignore-platform-reqs

FROM php:8.2-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=vendor /app/vendor /app/vendor
COPY . /app

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

ENV PORT=10000

EXPOSE 10000

CMD sh -c "php artisan migrate --force && php artisan db:seed --class=Database\\\\Seeders\\\\FerrySeeder --force && php -S 0.0.0.0:${PORT} -t public"
