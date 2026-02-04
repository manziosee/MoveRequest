# MoveRequest - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### One-Command Deployment
```bash
./deploy.sh
```

## 📋 Manual Deployment

### 1. Environment Setup
```bash
# Clone repository
git clone <repository-url>
cd MoveRequest

# Create environment file
cp .env.example .env
# Edit .env with your configuration
```

### 2. Docker Deployment
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Local Development
```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run start:dev
```

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
DATABASE_URL=file:./data/moverequest.db
NEXT_PUBLIC_API_URL=http://localhost/api
```

### Database Setup
```bash
# Run migrations and seed data
docker-compose exec backend npm run seed
```

## 📡 API Testing

### Postman Collection
Import `postman-collection.json` into Postman for complete API testing.

### Demo Accounts
- **Admin**: admin@company.com / password
- **Procurement**: procurement@company.com / password  
- **Employee**: employee@company.com / password

## 🌐 Access URLs

- **Frontend**: http://localhost
- **Backend API**: http://localhost/api
- **API Documentation**: http://localhost/api/docs

## 🔒 Security Features

- JWT Authentication
- Role-based Access Control
- Rate Limiting
- CORS Protection
- Input Validation
- SQL Injection Prevention

## 📊 Monitoring

### Health Checks
```bash
curl http://localhost/health
curl http://localhost/api/health
```

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🛠️ Maintenance

### Backup Database
```bash
docker-compose exec backend cp /app/data/moverequest.db /app/backup/
```

### Update Services
```bash
docker-compose pull
docker-compose up -d
```

### Scale Services
```bash
docker-compose up -d --scale backend=2
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check port usage
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :3001
   ```

2. **Database Issues**
   ```bash
   # Reset database
   docker-compose down -v
   docker-compose up -d
   ```

3. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Debug Mode
```bash
# Enable debug logging
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up -d
```

## 📈 Performance Optimization

### Production Optimizations
- Nginx reverse proxy with caching
- Gzip compression
- Static file optimization
- Database connection pooling
- Rate limiting

### Scaling Recommendations
- Use PostgreSQL for production
- Implement Redis for caching
- Add load balancer for multiple instances
- Use CDN for static assets

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        run: ./deploy.sh
```

## 📞 Support

For issues and questions:
- Check logs: `docker-compose logs -f`
- Review API documentation: http://localhost/api/docs
- Test with Postman collection

## 🎯 Next Steps

1. Configure SSL certificates
2. Set up monitoring (Prometheus/Grafana)
3. Implement backup strategy
4. Configure email notifications
5. Add integration tests