import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics based on user role' })
  @ApiResponse({ status: 200, description: 'Returns role-specific dashboard statistics' })
  async getDashboardStats(@CurrentUser() user: User) {
    if (user.role === 'employee') {
      return this.dashboardService.getEmployeeStats(user.id);
    } else if (user.role === 'procurement') {
      return this.dashboardService.getProcurementStats();
    } else {
      return this.dashboardService.getAdminStats();
    }
  }
}