FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    zip unzip git curl \
    libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd
RUN echo "opcache.enable=0" > /usr/local/etc/php/conf.d/opcache-dev.ini


CMD ["php-fpm"]
WORKDIR /var/www