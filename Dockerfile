FROM php:8.3-apache

COPY default.conf /etc/apache2/sites-available/000-default.conf

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    nano \
    nano \
    mariadb-client \
    libfreetype6-dev \
    libjpeg-dev \
    libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql
# Enable Apache mod_rewrite
RUN a2enmod rewrite


# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory to /var/www/html
WORKDIR /var/www/html

# Install Drush (inside the Drupal root directory)
RUN composer require drush/drush

# Add drush to the server alias
RUN echo 'alias drush="vendor/bin/drush"' >> ~/.bashrc

# Set PATH for Drush
ENV PATH="/root/.composer/vendor/bin:${PATH}"

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]