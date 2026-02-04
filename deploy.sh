#!/bin/bash

# MoveRequest Deployment Script
set -e

echo "🚀 Starting MoveRequest Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p ssl
mkdir -p backend/data

# Set environment variables
print_status "Setting up environment variables..."
if [ ! -f .env ]; then
    cat > .env << EOF
# Production Environment Variables
NODE_ENV=production
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRES_IN=24h
DATABASE_URL=file:./data/moverequest.db
NEXT_PUBLIC_API_URL=http://localhost/api
EOF
    print_success "Environment file created"
else
    print_warning "Environment file already exists"
fi

# Build and start services
print_status "Building Docker images..."
docker-compose build --no-cache

print_status "Starting services..."
docker-compose up -d

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    print_success "Services are running!"
else
    print_error "Some services failed to start"
    docker-compose logs
    exit 1
fi

# Run database migrations and seed data
print_status "Setting up database..."
docker-compose exec backend npm run seed

print_success "🎉 Deployment completed successfully!"
echo ""
echo "📱 Application URLs:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost/api"
echo "   API Documentation: http://localhost/api/docs"
echo ""
echo "👤 Demo Accounts:"
echo "   Admin: admin@company.com / password"
echo "   Procurement: procurement@company.com / password"
echo "   Employee: employee@company.com / password"
echo ""
echo "🔧 Management Commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Update services: docker-compose pull && docker-compose up -d"
echo ""
print_success "Happy coding! 🚀"