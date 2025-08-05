# Docker Containerization

This project includes production-ready Docker containerization with development and production configurations.

## Quick Start

### Development (with hot reload)
```bash
# Start development container
pnpm docker:dev

# Access app at http://localhost:5174
# Hot reload works - edit files and see changes instantly
```

### Production 
```bash
# Build and run production container
pnpm docker:build
pnpm docker:prod

# Access app at http://localhost:3000
# Optimized nginx serving static files
```

## Container Architecture

### Multi-stage Production Build
```
┌─────────────────┐    ┌─────────────────┐
│  Builder Stage  │───▶│ Production Stage│
│  Node.js + pnpm │    │  Nginx + Static │
│  Build React app│    │  Serve files    │
└─────────────────┘    └─────────────────┘
```

### Development Container
```
┌─────────────────┐
│  Dev Container  │
│  Node.js + pnpm │
│  Hot reload     │
│  Volume mounts  │
└─────────────────┘
```

## File Structure

```
docker/
├── Dockerfile              # Production multi-stage build
├── Dockerfile.dev          # Development with hot reload
├── docker-compose.yml      # Orchestration configuration
├── nginx.conf             # Production nginx config
└── .dockerignore          # Build context optimization
```

## Available Commands

### Development
```bash
# Start development environment
pnpm docker:dev

# Build development image only
pnpm docker:build:dev
```

### Production
```bash
# Build production image
pnpm docker:build

# Run production container
pnpm docker:prod

# Both development and production
docker-compose -f docker/docker-compose.yml up
```

### Profiles
```bash
# Development only (default)
docker-compose -f docker/docker-compose.yml up

# Production only  
docker-compose -f docker/docker-compose.yml --profile production up
```

## Configuration Details

### Production Container (Dockerfile)
- **Base**: `node:22-alpine` (security + size)
- **Multi-stage**: Build → Nginx serving
- **Security**: Non-root user, security headers  
- **Performance**: Gzip compression, static caching
- **Health checks**: Built-in endpoint monitoring
- **Size**: ~50MB final image

### Development Container (Dockerfile.dev)
- **Base**: `node:22-alpine`
- **Hot reload**: Volume mounts for live editing
- **Port**: 5174 (avoids conflict with local dev on 5173)
- **Security**: Non-root user
- **Environment**: Development optimized

### Nginx Configuration
- **SPA routing**: Handles React Router
- **Security headers**: XSS, CSRF protection
- **Compression**: Gzip for better performance
- **Caching**: 1-year cache for static assets
- **Health endpoint**: `/health` for monitoring

## Docker Compose Services

### App Service (Development)
```yaml
app:
  - Port: 5174
  - Hot reload: ✅
  - Environment: development
  - Health checks: ✅
```

### App-Prod Service (Production)
```yaml
app-prod:
  - Port: 3000  
  - Nginx serving: ✅
  - Environment: production
  - Profile: production
```

## Best Practices Implemented

### Security
- ✅ Non-root users in containers
- ✅ Security headers in nginx
- ✅ Minimal attack surface (Alpine Linux)
- ✅ No secrets in images

### Performance  
- ✅ Multi-stage builds (smaller images)
- ✅ Layer caching optimization
- ✅ Gzip compression
- ✅ Static asset caching
- ✅ Health checks

### Development Experience
- ✅ Hot reload preservation
- ✅ Volume mounts for code changes
- ✅ Non-conflicting ports (5174 vs 5173 local)
- ✅ Environment variable support

## Environment Variables

### Development
```bash
NODE_ENV=development
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

### Production
```bash
NODE_ENV=production
```

## Deployment Options

### Cloud Platforms
```bash
# Build for deployment
docker build -f docker/Dockerfile -t myapp:latest .

# Deploy to:
# - AWS ECS/Fargate
# - Google Cloud Run  
# - Azure Container Instances
# - DigitalOcean App Platform
# - Railway, Render, Fly.io
```

### Self-Hosted
```bash
# Docker Swarm
docker service create --name myapp -p 80:80 myapp:latest

# Kubernetes
kubectl create deployment myapp --image=myapp:latest
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using ports
lsof -i :5173   # Local dev
lsof -i :5174   # Docker dev
```

#### Permission Denied
```bash
# Fix Docker permissions on Linux
sudo usermod -aG docker $USER
newgrp docker
```

#### Build Failures
```bash
# Clear Docker cache
docker system prune -a

# Rebuild from scratch
docker-compose -f docker/docker-compose.yml build --no-cache
```

#### Hot Reload Not Working
- Ensure volumes are correctly mounted
- Check file watching limits on Linux:
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```

### Health Checks
```bash
# Check container health
docker ps

# View health check logs
docker inspect <container_id>
```

## Comparison: Local vs Docker

| Aspect | Local Development | Docker Development |
|--------|-------------------|-------------------|
| **Setup** | `pnpm install` | `pnpm docker:dev` |
| **Port** | :5173 | :5174 |
| **Speed** | Fastest | Slightly slower |
| **Consistency** | Varies by machine | Identical everywhere |
| **Isolation** | Uses local Node | Isolated container |
| **Hot Reload** | ✅ Native | ✅ Volume mounts |
| **Debugging** | Direct | Port forwarding |


## When to Use Docker

### Use Docker When:
- ✅ Working in a team (consistency)
- ✅ Different Node.js versions locally
- ✅ Testing production builds
- ✅ Preparing for deployment
- ✅ CI/CD environment matching

### Use Local When:
- ✅ Solo development
- ✅ Maximum performance needed
- ✅ Debugging with native tools
- ✅ Quick prototyping

## Future Extensions

The Docker setup supports adding:
- Database containers (PostgreSQL, MongoDB)
- Redis for caching
- Background job workers
- Load balancers
- Monitoring tools

Example of adding a database:
```yaml
# Uncomment in docker-compose.yml
database:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: myapp
  ports:
    - "5432:5432"
```

## Multi-platform Builds

Build for different architectures:
```bash
# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -f docker/Dockerfile -t myapp:latest .
```

This ensures your containers work on both Intel and ARM processors (Apple Silicon, AWS Graviton, etc.).