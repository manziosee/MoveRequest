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

Complete REST API with WebSocket support for managing movement requests, approvals, users, and real-time notifications.

## Features
- 🔐 JWT Authentication with role-based access control (RBAC)
- 📋 Full CRUD operations for movement requests with 4-step wizard
- ✅ Multi-level approval workflow with comments
- 🔔 Real-time WebSocket notifications with toast alerts
- 📊 Real-time dashboards and analytics
- 📈 Comprehensive reporting with CSV/PDF/Excel exports
- 👥 User, category, and department management
- 📎 File upload and attachment management
- 🔄 Bulk operations (approve, reject, export)
- 📧 Email notifications via SendGrid
- 💾 System backup and data export
- 📉 User activity tracking and audit logs

## Real-Time Notifications
Connect to WebSocket at **ws://localhost:5000** with authentication:
\`\`\`javascript
const socket = io('http://localhost:5000', {
  auth: { token: 'your-jwt-token' }
});
socket.on('notification', (data) => console.log(data));
\`\`\`

## Authentication
Most endpoints require authentication. Use the /auth/login endpoint to obtain a JWT token, then click the "Authorize" button above and enter: **Bearer <your-token>**

## Roles & Permissions
- **employee**: Create and view own requests, receive approval notifications
- **procurement**: Approve/reject all requests, view all requests, receive submission notifications
- **admin**: Full system access including user management, categories, departments, system config, bulk operations

## Demo Accounts
- **Admin**: manziosee3@gmail.com / 123456 (Full access)
- **Procurement**: manziosee2001@gmail.com / 123456 (Approvals)
- **Employee**: oseemanzi3@gmail.com / 123456 (Requests)

## Workflow
1. **Employee** creates request → **Procurement** users notified (WebSocket + Email)
2. **Procurement** approves/rejects → **Employee** notified with comment (WebSocket + Email)
3. Real-time dashboard updates and unread notification counts
    `)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('health', 'Health check and system status endpoints')
    .addTag('auth', 'Authentication, registration, password reset, and profile management')
    .addTag('users', 'User management, roles, and activity tracking')
    .addTag('requests', 'Movement request CRUD, filtering, search, and statistics')
    .addTag('approvals', 'Approval workflow, bulk operations, history, and comments')
    .addTag('reports', 'Reports, analytics, exports (CSV/PDF/Excel), and financial tracking')
    .addTag('admin', 'Admin panel: users, categories, departments, system config, backups, bulk operations')
    .addTag('dashboard', 'Role-based dashboard statistics and real-time metrics')
    .addTag('notifications', 'Real-time notifications, unread count, mark as read (WebSocket + REST)')
    .addTag('files', 'File upload, download, delete, and attachment management')
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