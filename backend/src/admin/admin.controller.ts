import { Controller, Get, Post, Put, Delete, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AdminService } from './admin.service';
import { CreateCategoryDto, CreateDepartmentDto, SystemConfigDto } from './dto/admin.dto';

@ApiTags('admin')
@Controller('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Categories - Allow all authenticated users to read
  @Get('categories')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Returns list of all categories' })
  getCategories() {
    return this.adminService.getCategories();
  }

  @Post('categories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  updateCategory(@Param('id') id: string, @Body() updateData: Partial<CreateCategoryDto>) {
    return this.adminService.updateCategory(+id, updateData);
  }

  @Delete('categories/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  deleteCategory(@Param('id') id: string) {
    return this.adminService.deleteCategory(+id);
  }

  // Departments - Allow all authenticated users to read
  @Get('departments')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({ status: 200, description: 'Returns list of all departments' })
  getDepartments() {
    return this.adminService.getDepartments();
  }

  @Post('departments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create new department' })
  @ApiResponse({ status: 201, description: 'Department created successfully' })
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.adminService.createDepartment(createDepartmentDto);
  }

  @Put('departments/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update department' })
  @ApiResponse({ status: 200, description: 'Department updated successfully' })
  updateDepartment(@Param('id') id: string, @Body() updateData: Partial<CreateDepartmentDto>) {
    return this.adminService.updateDepartment(+id, updateData);
  }

  @Delete('departments/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete department' })
  @ApiResponse({ status: 200, description: 'Department deleted successfully' })
  deleteDepartment(@Param('id') id: string) {
    return this.adminService.deleteDepartment(+id);
  }

  @Patch('departments/:id/toggle-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Toggle department active status' })
  @ApiResponse({ status: 200, description: 'Department status toggled successfully' })
  toggleDepartmentStatus(@Param('id') id: string) {
    return this.adminService.toggleDepartmentStatus(+id);
  }

  // System Configuration - Admin only
  @Get('system-config')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get system configuration' })
  @ApiResponse({ status: 200, description: 'Returns system configuration' })
  getSystemConfig() {
    return this.adminService.getSystemConfig();
  }

  @Put('system-config')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update system configuration' })
  @ApiResponse({ status: 200, description: 'System configuration updated successfully' })
  updateSystemConfig(@Body() config: SystemConfigDto) {
    return this.adminService.updateSystemConfig(config);
  }

  // System Stats - Admin only
  @Get('system-stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get system statistics' })
  @ApiResponse({ status: 200, description: 'Returns comprehensive system statistics' })
  getSystemStats() {
    return this.adminService.getSystemStats();
  }

  @Get('user-activity')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get user activity statistics' })
  @ApiResponse({ status: 200, description: 'Returns user activity data' })
  getUserActivity() {
    return this.adminService.getUserActivity();
  }

  @Get('backup-info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get backup information' })
  @ApiResponse({ status: 200, description: 'Returns backup status and schedule' })
  getBackupInfo() {
    return this.adminService.getBackupInfo();
  }

  @Post('backup')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Perform system backup' })
  @ApiResponse({ status: 200, description: 'Backup initiated successfully' })
  performBackup() {
    return this.adminService.performBackup();
  }

  @Post('bulk-approve-requests')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Bulk approve requests' })
  @ApiResponse({ status: 200, description: 'Requests approved successfully' })
  bulkApproveRequests(@Body('requestIds') requestIds: number[]) {
    return this.adminService.bulkApproveRequests(requestIds);
  }

  @Get('export-users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Export user data' })
  @ApiResponse({ status: 200, description: 'Returns all user data for export' })
  exportUserData() {
    return this.adminService.exportUserData();
  }


}