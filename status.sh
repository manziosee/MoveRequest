#!/bin/bash

echo "🔍 MoveRequest System Status"
echo "=============================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running"
    exit 1
fi

# Check services
echo "📦 Services Status:"
docker-compose ps

echo ""
echo "🌐 Service URLs:"
echo "   Frontend: http://localhost"
echo "   Backend: http://localhost/api"
echo "   API Docs: http://localhost/api/docs"

echo ""
echo "📊 Resource Usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

echo ""
echo "🔧 Quick Commands:"
echo "   Logs: docker-compose logs -f [service]"
echo "   Restart: docker-compose restart [service]"
echo "   Stop: docker-compose down"
