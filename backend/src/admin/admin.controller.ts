import { Controller, Get, Post, Put, Delete, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminService } from './admin.service';
import { CreateCategoryDto, CreateDepartmentDto, SystemConfigDto } from './dto/admin.dto';

@ApiTags('admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Categories
  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Returns list of all categories' })
  getCategories() {
    return this.adminService.getCategories();
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  updateCategory(@Param('id') id: string, @Body() updateData: Partial<CreateCategoryDto>) {
    return this.adminService.updateCategory(+id, updateData);
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  deleteCategory(@Param('id') id: string) {
    return this.adminService.deleteCategory(+id);
  }

  // Departments
  @Get('departments')
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({ status: 200, description: 'Returns list of all departments' })
  getDepartments() {
    return this.adminService.getDepartments();
  }

  @Post('departments')
  @ApiOperation({ summary: 'Create new department' })
  @ApiResponse({ status: 201, description: 'Department created successfully' })
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.adminService.createDepartment(createDepartmentDto);
  }

  @Put('departments/:id')
  @ApiOperation({ summary: 'Update department' })
  @ApiResponse({ status: 200, description: 'Department updated successfully' })
  updateDepartment(@Param('id') id: string, @Body() updateData: Partial<CreateDepartmentDto>) {
    return this.adminService.updateDepartment(+id, updateData);
  }

  @Delete('departments/:id')
  @ApiOperation({ summary: 'Delete department' })
  @ApiResponse({ status: 200, description: 'Department deleted successfully' })
  deleteDepartment(@Param('id') id: string) {
    return this.adminService.deleteDepartment(+id);
  }

  @Patch('departments/:id/toggle-status')
  @ApiOperation({ summary: 'Toggle department active status' })
  @ApiResponse({ status: 200, description: 'Department status toggled successfully' })
  toggleDepartmentStatus(@Param('id') id: string) {
    return this.adminService.toggleDepartmentStatus(+id);
  }

  // System Configuration
  @Get('system-config')
  @ApiOperation({ summary: 'Get system configuration' })
  @ApiResponse({ status: 200, description: 'Returns system configuration' })
  getSystemConfig() {
    return this.adminService.getSystemConfig();
  }

  @Put('system-config')
  @ApiOperation({ summary: 'Update system configuration' })
  @ApiResponse({ status: 200, description: 'System configuration updated successfully' })
  updateSystemConfig(@Body() config: SystemConfigDto) {
    return this.adminService.updateSystemConfig(config);
  }

  // System Stats
  @Get('system-stats')
  @ApiOperation({ summary: 'Get system statistics' })
  @ApiResponse({ status: 200, description: 'Returns comprehensive system statistics' })
  getSystemStats() {
    return this.adminService.getSystemStats();
  }

  @Get('user-activity')
  @ApiOperation({ summary: 'Get user activity statistics' })
  @ApiResponse({ status: 200, description: 'Returns user activity data' })
  getUserActivity() {
    return this.adminService.getUserActivity();
  }

  @Get('backup-info')
  @ApiOperation({ summary: 'Get backup information' })
  @ApiResponse({ status: 200, description: 'Returns backup status and schedule' })
  getBackupInfo() {
    return this.adminService.getBackupInfo();
  }

  @Post('backup')
  @ApiOperation({ summary: 'Perform system backup' })
  @ApiResponse({ status: 200, description: 'Backup initiated successfully' })
  performBackup() {
    return this.adminService.performBackup();
  }

  @Post('bulk-approve-requests')
  @ApiOperation({ summary: 'Bulk approve requests' })
  @ApiResponse({ status: 200, description: 'Requests approved successfully' })
  bulkApproveRequests(@Body('requestIds') requestIds: number[]) {
    return this.adminService.bulkApproveRequests(requestIds);
  }

  @Get('export-users')
  @ApiOperation({ summary: 'Export user data' })
  @ApiResponse({ status: 200, description: 'Returns all user data for export' })
  exportUserData() {
    return this.adminService.exportUserData();
  }


}