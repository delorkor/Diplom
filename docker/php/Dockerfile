FROM php:8.1-fpm


# RUN apt-get update && apt-get install -y \
#     curl libpng-dev cron libzip-dev libonig-dev libxml2-dev libgmp-dev zip-dev zlib1g-dev unzip 


RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    cron \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libgmp-dev \
    supervisor \
    zip \
    zlib1g-dev \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd gmp zip
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

WORKDIR /var/www/html
# Куда же без composer'а.
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN chown -R www-data:www-data /var/www/html

RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

COPY --chown=www:www . /var/www

# Change current user to www
USER www


EXPOSE 9000
CMD ["php-fpm"]


