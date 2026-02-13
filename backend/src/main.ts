import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : ['http://localhost:3000', 'http://localhost:3001', 'https://move-request.vercel.app'],
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('MoveRequest API')
    .setDescription(`
# Movement & Procurement Management System API

Complete REST API for managing movement requests, approvals, users, and reports.

## Features
- 🔐 JWT Authentication with role-based access control
- 📋 Full CRUD operations for movement requests
- ✅ Multi-level approval workflow
- 📊 Real-time dashboards and analytics
- 📈 Comprehensive reporting and exports
- 👥 User and department management
- 🔔 Real-time notifications
- 📎 File upload and management

## Authentication
Most endpoints require authentication. Use the /auth/login endpoint to obtain a JWT token, then click the "Authorize" button above and enter: Bearer <your-token>

## Roles
- **employee**: Can create and view own requests
- **procurement**: Can approve/reject requests and view all requests
- **admin**: Full system access including user and system management

## Demo Accounts
- Admin: manziosee3@gmail.com / 123456
- Procurement: manziosee2001@gmail.com / 123456
- Employee: oseemanzi3@gmail.com / 123456
    `)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('health', 'Health check and system status endpoints')
    .addTag('auth', 'Authentication and authorization endpoints')
    .addTag('users', 'User management and profile endpoints')
    .addTag('requests', 'Movement request CRUD and management endpoints')
    .addTag('approvals', 'Approval workflow and history endpoints')
    .addTag('reports', 'Reports, analytics, and export endpoints')
    .addTag('admin', 'Admin panel and system management endpoints')
    .addTag('dashboard', 'Dashboard statistics and metrics endpoints')
    .addTag('notifications', 'Notification management endpoints')
    .addTag('files', 'File upload and management endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend running on http://0.0.0.0:${port}`);
  console.log(`📚 API Documentation: http://0.0.0.0:${port}/api`);
  console.log(`💓 Health Check: http://0.0.0.0:${port}/health`);
}
bootstrap();