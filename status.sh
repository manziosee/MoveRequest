#!/bin/bash

# System Status Check Script
echo "🔍 MoveRequest System Status Check"
echo "=================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_service() {
    if docker-compose ps | grep -q "$1.*Up"; then
        echo -e "${GREEN}✓${NC} $1 is running"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is not running"
        return 1
    fi
}

check_url() {
    if curl -s -o /dev/null -w "%{http_code}" "$1" | grep -q "200\|302"; then
        echo -e "${GREEN}✓${NC} $1 is accessible"
        return 0
    else
        echo -e "${RED}✗${NC} $1 is not accessible"
        return 1
    fi
}

echo "📦 Docker Services:"
check_service "frontend"
check_service "backend" 
check_service "nginx"

echo ""
echo "🌐 Service URLs:"
check_url "http://localhost"
check_url "http://localhost/api/health"
check_url "http://localhost/api/docs"

echo ""
echo "💾 Database Status:"
if docker-compose exec -T backend test -f /app/data/moverequest.db; then
    echo -e "${GREEN}✓${NC} Database file exists"
    DB_SIZE=$(docker-compose exec -T backend stat -c%s /app/data/moverequest.db 2>/dev/null || echo "0")
    echo "  Database size: ${DB_SIZE} bytes"
else
    echo -e "${RED}✗${NC} Database file not found"
fi

echo ""
echo "📊 Resource Usage:"
echo "Docker containers:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" | head -4

echo ""
echo "🔧 Quick Actions:"
echo "  View logs: docker-compose logs -f"
echo "  Restart: docker-compose restart"
echo "  Stop: docker-compose down"
echo "  Update: docker-compose pull && docker-compose up -d"