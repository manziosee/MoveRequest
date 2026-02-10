import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('MoveRequest API')
    .setDescription('Movement & Procurement Management System API - Complete REST API for managing movement requests, approvals, users, and reports')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('health', 'Health check endpoints')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('requests', 'Movement request endpoints')
    .addTag('approvals', 'Approval workflow endpoints')
    .addTag('reports', 'Reports and analytics endpoints')
    .addTag('admin', 'Admin management endpoints')
    .addTag('dashboard', 'Dashboard statistics endpoints')
    .addTag('notifications', 'Notification endpoints')
    .addTag('files', 'File upload endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();