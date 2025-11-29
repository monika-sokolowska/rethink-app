# Docker Setup Guide

This project uses Docker Compose to run the entire application stack with separate containers for the frontend, backend, and database.

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- At least 4GB of available RAM
- Ports 3000, 3306, and 8080 available

## Quick Start

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd rethink-app
   ```

2. **Create environment file** (optional):
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to customize configuration if needed.

3. **Build and start all services**:
   ```bash
   docker-compose up -d --build
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - MySQL: localhost:3306

## Services

### MySQL Database
- **Container**: `rethink-mysql`
- **Port**: 3306
- **Database**: `rethinkdb` (configurable via `MYSQL_DATABASE`)
- **Data Persistence**: Data is stored in a Docker volume `mysql_data`

### Spring Boot Backend
- **Container**: `rethink-backend`
- **Port**: 8080
- **Health Check**: Configured to wait for MySQL before starting
- **Environment Variables**: Configured via docker-compose.yml

### React Frontend
- **Container**: `rethink-frontend`
- **Port**: 3000 (mapped to nginx port 80)
- **Web Server**: Nginx (serving built React app)

## Useful Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes database data)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Rebuild a specific service
```bash
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

### Access MySQL container
```bash
docker exec -it rethink-mysql mysql -u root -p
```

### Access backend container shell
```bash
docker exec -it rethink-backend sh
```

### Access frontend container shell
```bash
docker exec -it rethink-frontend sh
```

## Environment Variables

You can customize the configuration by creating a `.env` file in the root directory. See `.env.example` for available variables.

### Key Variables:
- `MYSQL_ROOT_PASSWORD`: MySQL root password
- `MYSQL_DATABASE`: Database name
- `MYSQL_USER`: Database user
- `MYSQL_PASSWORD`: Database user password
- `JWT_SECRET`: JWT secret key for authentication
- `REACT_APP_API_URL`: Backend API URL (for frontend build)

## Troubleshooting

### Port already in use
If you get port conflicts, either:
1. Stop the conflicting service
2. Change the port mappings in `docker-compose.yml`

### Database connection issues
- Ensure MySQL container is healthy: `docker-compose ps`
- Check MySQL logs: `docker-compose logs mysql`
- Verify environment variables are set correctly

### Frontend can't connect to backend
- Ensure `REACT_APP_API_URL` is set correctly in docker-compose.yml
- Check that backend is running: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`

### Rebuild everything from scratch
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## Development vs Production

### Development
- Use `docker-compose up` to see logs in real-time
- Mount volumes for live code reloading (not configured by default)

### Production
- Use `docker-compose up -d` to run in detached mode
- Ensure environment variables are properly secured
- Consider using Docker secrets for sensitive data
- Set up proper SSL/TLS certificates
- Configure firewall rules appropriately

## Notes

- The database data persists in a Docker volume. To reset the database, use `docker-compose down -v`
- The frontend is built at container creation time. To update it, rebuild the container
- Health checks ensure services start in the correct order
- All services communicate via a Docker network (`rethink-network`)

