import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('procurement', 'admin')
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard-stats')
  getDashboardStats() {
    return this.reportsService.getDashboardStats();
  }

  @Get('monthly-trends')
  getMonthlyTrends() {
    return this.reportsService.getMonthlyTrends();
  }

  @Get('department-stats')
  getDepartmentStats() {
    return this.reportsService.getDepartmentStats();
  }

  @Get('status-distribution')
  getStatusDistribution() {
    return this.reportsService.getStatusDistribution();
  }

  @Get('priority-breakdown')
  getPriorityBreakdown() {
    return this.reportsService.getPriorityBreakdown();
  }

  @Get('export')
  exportData(@Query('format') format: string = 'json') {
    return this.reportsService.exportData(format);
  }
}