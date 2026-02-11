import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get dashboard statistics for reports' })
  @ApiResponse({ status: 200, description: 'Returns report dashboard statistics' })
  getDashboardStats() {
    return this.reportsService.getDashboardStats();
  }

  @Get('monthly-trends')
  @ApiOperation({ summary: 'Get monthly request trends' })
  @ApiResponse({ status: 200, description: 'Returns monthly trend data for last 6 months' })
  getMonthlyTrends() {
    return this.reportsService.getMonthlyTrends();
  }

  @Get('department-stats')
  @ApiOperation({ summary: 'Get department statistics' })
  @ApiResponse({ status: 200, description: 'Returns department-wise statistics' })
  getDepartmentStats() {
    return this.reportsService.getDepartmentStats();
  }

  @Get('status-distribution')
  @ApiOperation({ summary: 'Get request status distribution' })
  @ApiResponse({ status: 200, description: 'Returns status distribution data' })
  getStatusDistribution() {
    return this.reportsService.getStatusDistribution();
  }

  @Get('priority-breakdown')
  @ApiOperation({ summary: 'Get priority breakdown' })
  @ApiResponse({ status: 200, description: 'Returns priority breakdown data' })
  getPriorityBreakdown() {
    return this.reportsService.getPriorityBreakdown();
  }

  @Get('export')
  @ApiOperation({ summary: 'Export report data' })
  @ApiQuery({ name: 'format', required: false, enum: ['json', 'csv'], description: 'Export format' })
  @ApiResponse({ status: 200, description: 'Returns exported data in specified format' })
  exportData(@Query('format') format: string = 'json') {
    return this.reportsService.exportData(format);
  }
}