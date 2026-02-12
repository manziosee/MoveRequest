#!/bin/bash
set -e

echo "🔨 Building MoveRequest Backend for Render..."

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!"
