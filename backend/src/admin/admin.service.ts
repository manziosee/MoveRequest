import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Department } from './entities/department.entity';
import { User } from '../users/entities/user.entity';
import { MovementRequest } from '../requests/entities/movement-request.entity';
import { CreateCategoryDto, CreateDepartmentDto, SystemConfigDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(MovementRequest)
    private requestRepository: Repository<MovementRequest>,
  ) {}

  // Categories
  async getCategories() {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async updateCategory(id: string, updateData: Partial<CreateCategoryDto>) {
    await this.categoryRepository.update(id, updateData);
    return this.categoryRepository.findOne({ where: { id } });
  }

  async deleteCategory(id: string) {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Category not found');
    return { message: 'Category deleted successfully' };
  }

  // Departments
  async getDepartments() {
    return this.departmentRepository.find({ order: { name: 'ASC' } });
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(department);
  }

  async updateDepartment(id: string, updateData: Partial<CreateDepartmentDto>) {
    await this.departmentRepository.update(id, updateData);
    return this.departmentRepository.findOne({ where: { id } });
  }

  async deleteDepartment(id: string) {
    const result = await this.departmentRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Department not found');
    return { message: 'Department deleted successfully' };
  }

  async toggleDepartmentStatus(id: string) {
    const department = await this.departmentRepository.findOne({ where: { id } });
    if (!department) throw new NotFoundException('Department not found');
    
    await this.departmentRepository.update(id, { isActive: !department.isActive });
    return this.departmentRepository.findOne({ where: { id } });
  }

  // System Configuration
  async getSystemConfig() {
    return {
      companyName: 'Acme Corporation',
      timezone: 'UTC-5 (Eastern Time)',
      currency: 'RWF',
      maintenanceMode: false,
      emailNotifications: true,
      autoApproval: false,
      approvalThreshold: '500000',
    };
  }

  async updateSystemConfig(config: SystemConfigDto) {
    // In a real app, this would save to a config table
    return { message: 'System configuration updated', config };
  }

  // System Stats
  async getSystemStats() {
    const totalUsers = await this.userRepository.count();
    const activeUsers = await this.userRepository.count({ where: { isActive: true } });
    const totalRequests = await this.requestRepository.count();
    const pendingRequests = await this.requestRepository.count({ where: { status: 'pending' } });

    const userGrowth = await this.userRepository
      .createQueryBuilder('user')
      .select('strftime("%m", user.createdAt)', 'month')
      .addSelect('COUNT(*)', 'count')
      .groupBy('strftime("%m", user.createdAt)')
      .orderBy('month')
      .getRawMany();

    const roleDistribution = await this.userRepository
      .createQueryBuilder('user')
      .select('user.role', 'role')
      .addSelect('COUNT(*)', 'count')
      .groupBy('user.role')
      .getRawMany();

    return {
      totalUsers,
      activeUsers,
      totalRequests,
      pendingRequests,
      userGrowth: userGrowth.map(item => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(item.month) - 1],
        users: parseInt(item.count),
      })),
      roleDistribution: roleDistribution.map(item => ({
        name: item.role.charAt(0).toUpperCase() + item.role.slice(1),
        value: parseInt(item.count),
      })),
    };
  }

  // Bulk Operations
  async bulkApproveRequests(requestIds: string[]) {
    await this.requestRepository.update(requestIds, { status: 'approved' });
    return { message: `${requestIds.length} requests approved`, count: requestIds.length };
  }

  async bulkDeleteUsers(userIds: string[]) {
    await this.userRepository.delete(userIds);
    return { message: `${userIds.length} users deleted`, count: userIds.length };
  }
}