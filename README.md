# Drupal Starter Project

This project sets up a Drupal environment using Docker. It includes a Drupal application, a MariaDB database, and phpMyAdmin for database management.

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

1. **Clone the Repository**

   Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Configure Environment Variables**

   Ensure that the environment variables in the `docker-compose.yml` file are set correctly. The default values are:

   ```yaml
   DRUPAL_DATABASE_HOST: db
   DRUPAL_DATABASE_USER: drupal
   DRUPAL_DATABASE_PASSWORD: drupal
   DRUPAL_DATABASE_NAME: drupal
   MYSQL_ROOT_PASSWORD: root
   MYSQL_DATABASE: drupal
   MYSQL_USER: drupal
   MYSQL_PASSWORD: drupal
   ```

3. **Build and Start the Containers**

   Use Docker Compose to build and start the containers:

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers for Drupal, MariaDB, and phpMyAdmin.

4. **Access the Application**

   - **Drupal**: Open your web browser and go to `http://localhost:8080` to access the Drupal site.
   - **phpMyAdmin**: Go to `http://localhost:8081` to manage your database using phpMyAdmin.

5. **Stop the Containers**

   To stop the running containers, use:

   ```bash
   docker-compose down
   ```
6. **SSH Connection to the Containers**

   To stop the running containers, use:

   ```bash
    docker exec -it drupal-starter bash
   ```

## Database
   Import database by this command
   ```
   mysql -h 127.0.0.1 -P 3306 -u drupal -p drupal < /path/to/db.sql
   ```
## Volumes

The project uses Docker volumes to persist data:

- `drupal-data`: Stores Drupal-specific data.
- `db-data`: Stores MariaDB data.

## Troubleshooting

- Ensure Docker and Docker Compose are installed and running on your machine.
- Check for any port conflicts on `8080` and `8081`.
- If you encounter issues, try rebuilding the containers with `docker-compose up --build`.

## Additional Information

- The Drupal application is served by an Apache server.
- The database is managed by MariaDB, and phpMyAdmin is provided for easy database management.

For more detailed information, refer to the `docker-compose.yml` file:
