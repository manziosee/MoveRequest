import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API root endpoint' })
  @ApiResponse({ status: 200, description: 'Returns API information' })
  root() {
    return {
      name: 'MoveRequest API',
      version: '1.0.0',
      description: 'Movement & Procurement Management System API',
      documentation: '/api',
      health: '/health',
      endpoints: {
        auth: '/auth',
        users: '/users',
        requests: '/requests',
        approvals: '/approvals',
        dashboard: '/dashboard',
        reports: '/reports',
        notifications: '/notifications',
        admin: '/admin',
        files: '/files',
      },
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'API is healthy and running' })
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'MoveRequest API',
      version: '1.0.0',
    };
  }
}
