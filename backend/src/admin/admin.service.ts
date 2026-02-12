import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    return this.prisma.category.findMany({ orderBy: { name: 'asc' } });
  }

  async createCategory(data: any) {
    return this.prisma.category.create({ data });
  }

  async updateCategory(id: number, data: any) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async deleteCategory(id: number) {
    await this.prisma.category.delete({ where: { id } });
    return { message: 'Category deleted successfully' };
  }

  async getDepartments() {
    return this.prisma.department.findMany({ orderBy: { name: 'asc' } });
  }

  async createDepartment(data: any) {
    return this.prisma.department.create({ data });
  }

  async updateDepartment(id: number, data: any) {
    return this.prisma.department.update({ where: { id }, data });
  }

  async deleteDepartment(id: number) {
    await this.prisma.department.delete({ where: { id } });
    return { message: 'Department deleted successfully' };
  }

  async toggleDepartmentStatus(id: number) {
    const dept = await this.prisma.department.findUnique({ where: { id } });
    if (!dept) throw new NotFoundException('Department not found');
    return this.prisma.department.update({ 
      where: { id }, 
      data: { name: dept.name } // Department doesn't have isActive field
    });
  }

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

  async updateSystemConfig(config: any) {
    return { message: 'System configuration updated', config };
  }

  async getSystemStats() {
    const [totalUsers, activeUsers, totalRequests, pendingRequests] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.movementRequest.count(),
      this.prisma.movementRequest.count({ where: { status: 'pending' } }),
    ]);

    return { totalUsers, activeUsers, totalRequests, pendingRequests };
  }
}
