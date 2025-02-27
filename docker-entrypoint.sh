#!/bin/bash
set -e

echo "Starting entrypoint script..."

# Function to initialize the database if it doesn't exist
initialize_database() {
    echo "Checking for settings.php..."
    if [ ! -f /var/www/html/web/sites/default/settings.php ]; then
        echo "Creating settings.php and files directory..."
        cp /var/www/html/web/sites/default/default.settings.php /var/www/html/web/sites/default/settings.php
        chmod 666 /var/www/html/web/sites/default/settings.php

        mkdir -p /var/www/html/web/sites/default/files
        chmod -R 777 /var/www/html/web/sites/default/files

        echo "Database initialization..."
        # Here you would normally run the Drupal installation command
        # You can use drush or Drupal console here, for example:
        # drush site:install --db-url=mysql://drupal:drupal@db/drupal
    else
        echo "settings.php already exists."
    fi
}

# Initialize the database
initialize_database

# Start Apache server
echo "Starting Apache server..."
exec apache2-foreground
