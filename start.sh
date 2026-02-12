#!/bin/bash
set -e

echo "🚀 Starting MoveRequest Backend..."

# Navigate to backend directory
cd backend

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Seed database (optional, only if empty)
echo "🌱 Seeding database..."
npm run seed || echo "⚠️ Seed skipped (database may already be seeded)"

# Start the application
echo "✅ Starting application..."
node dist/src/main
