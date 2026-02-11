# Docker Setup - Fixed and Ready

## Changes Made

### 1. Port Configuration
- **Backend**: Changed from 3001 → 5000
- **Frontend**: Runs on 3000 internally, exposed as 3001
- **Nginx**: Port 80 (main access point)

### 2. Docker Files Updated
- `docker-compose.yml`: Fixed ports and environment variables
- `backend/Dockerfile`: Updated EXPOSE to 5000
- `Dockerfile.frontend`: Already correct
- `nginx.conf`: Updated backend upstream to port 5000
- `next.config.js`: Added `output: 'standalone'` for Docker

### 3. Environment Variables
- Created `.env` in root for Docker Compose
- Updated `backend/.env` with PORT=5000
- Fixed `NEXT_PUBLIC_API_URL` to use nginx proxy

### 4. New Files
- `.dockerignore`: Exclude unnecessary files from builds
- `backend/.dockerignore`: Backend-specific exclusions
- `status.sh`: Check system status

## Deployment Commands

### Quick Start
```bash
./deploy.sh
```

### Manual Steps
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
./status.sh

# View logs
docker-compose logs -f

# Seed database (if needed)
docker-compose exec backend npm run seed
```

### Stop Services
```bash
docker-compose down
```

### Clean Rebuild
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## Access URLs
- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **API Docs**: http://localhost/api/docs
- **Health Check**: http://localhost/health

## Service Architecture
```
Internet (Port 80)
    ↓
Nginx Reverse Proxy
    ├─→ Frontend (Next.js on :3000)
    └─→ Backend (NestJS on :5000)
         └─→ SQLite Database
```

## Troubleshooting

### Check if services are running
```bash
docker-compose ps
```

### View service logs
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
```

### Restart a service
```bash
docker-compose restart backend
```

### Access container shell
```bash
docker-compose exec backend sh
docker-compose exec frontend sh
```

### Check database
```bash
docker-compose exec backend ls -la /app/data/
```

## Configuration Validated
✅ docker-compose.yml syntax valid
✅ All ports configured correctly
✅ Environment variables set
✅ Dockerfiles updated
✅ Nginx proxy configured
✅ Scripts executable

## Ready to Deploy
Run `./deploy.sh` to start the full stack!
