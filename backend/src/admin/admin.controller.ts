import { Controller, Get, Post, Put, Delete, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
  getCategories() {
    return this.adminService.getCategories();
  }

  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminService.createCategory(createCategoryDto);
  }

  @Put('categories/:id')
  updateCategory(@Param('id') id: string, @Body() updateData: Partial<CreateCategoryDto>) {
    return this.adminService.updateCategory(id, updateData);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.adminService.deleteCategory(id);
  }

  // Departments
  @Get('departments')
  getDepartments() {
    return this.adminService.getDepartments();
  }

  @Post('departments')
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.adminService.createDepartment(createDepartmentDto);
  }

  @Put('departments/:id')
  updateDepartment(@Param('id') id: string, @Body() updateData: Partial<CreateDepartmentDto>) {
    return this.adminService.updateDepartment(id, updateData);
  }

  @Delete('departments/:id')
  deleteDepartment(@Param('id') id: string) {
    return this.adminService.deleteDepartment(id);
  }

  @Patch('departments/:id/toggle-status')
  toggleDepartmentStatus(@Param('id') id: string) {
    return this.adminService.toggleDepartmentStatus(id);
  }

  // System Configuration
  @Get('system-config')
  getSystemConfig() {
    return this.adminService.getSystemConfig();
  }

  @Put('system-config')
  updateSystemConfig(@Body() config: SystemConfigDto) {
    return this.adminService.updateSystemConfig(config);
  }

  // System Stats
  @Get('system-stats')
  getSystemStats() {
    return this.adminService.getSystemStats();
  }

  // Bulk Operations
  @Post('bulk-approve')
  bulkApproveRequests(@Body('requestIds') requestIds: string[]) {
    return this.adminService.bulkApproveRequests(requestIds);
  }

  @Post('bulk-delete-users')
  bulkDeleteUsers(@Body('userIds') userIds: string[]) {
    return this.adminService.bulkDeleteUsers(userIds);
  }
}