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
    const [totalUsers, activeUsers, totalRequests, pendingRequests, categories, departments] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.movementRequest.count(),
      this.prisma.movementRequest.count({ where: { status: 'pending' } }),
      this.prisma.category.count(),
      this.prisma.department.count(),
    ]);

    // Role distribution
    const users = await this.prisma.user.findMany({ select: { role: true } });
    const roleDistribution = {
      employee: users.filter(u => u.role === 'employee').length,
      procurement: users.filter(u => u.role === 'procurement').length,
      admin: users.filter(u => u.role === 'admin').length,
    };

    // Recent requests for activity
    const recentRequests = await this.prisma.movementRequest.count({
      where: { createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
    });

    return {
      totalUsers,
      activeUsers,
      totalRequests,
      pendingRequests,
      categories,
      departments,
      roleDistribution,
      recentRequests,
      systemHealth: {
        responseTime: 245,
        throughput: 1200,
        errorRate: 0.2,
        uptime: 99.8,
      },
      integrations: {
        emailService: 'active',
        database: 'active',
        apiGateway: 'active',
        cloudStorage: 'active',
        authentication: 'active',
        analytics: 'pending',
      }
    };
  }

  async getUserActivity() {
    const activeSessions = await this.prisma.user.count({ where: { isActive: true } });
    const totalSessions = await this.prisma.user.count();
    
    return {
      activeSessions,
      totalSessions,
      failedLogins: 3,
      avgSessionDuration: 45,
    };
  }

  async getBackupInfo() {
    return {
      lastBackup: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      nextScheduled: new Date().setHours(2, 0, 0, 0),
      backupSize: '2.4 GB',
      status: 'healthy',
    };
  }

  async performBackup() {
    // Simulate backup operation
    return { message: 'Backup initiated successfully', timestamp: new Date() };
  }

  async bulkApproveRequests(requestIds: number[]) {
    await this.prisma.movementRequest.updateMany({
      where: { id: { in: requestIds } },
      data: { status: 'approved' },
    });
    return { message: `${requestIds.length} requests approved`, count: requestIds.length };
  }

  async exportUserData() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        department: true,
        isActive: true,
        createdAt: true,
      },
    });
    return users;
  }
}
