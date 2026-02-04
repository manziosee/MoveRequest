import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  @Get('stats')
  async getDashboardStats(@CurrentUser() user: User) {
    if (user.role === 'employee') {
      return {
        totalRequests: 24,
        pending: 8,
        approved: 14,
        rejected: 2,
        successRate: 87,
        monthlyTrend: [12, 15, 18, 22, 25, 20],
      };
    } else if (user.role === 'procurement') {
      return {
        pending: 13,
        approvedToday: 14,
        avgProcessingTime: 2.1,
        approvalRate: 94,
        monthlyTrend: [45, 52, 48, 61, 58, 65],
      };
    } else {
      return {
        totalRequests: 206,
        totalUsers: 156,
        activeUsers: 148,
        departments: 12,
        approvalRate: 80,
        avgProcessingTime: 2.0,
        totalValue: 108000000,
        systemHealth: 98,
      };
    }
  }
}