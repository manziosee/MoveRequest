import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getEmployeeStats(userId: string) {
    const totalRequests = await this.prisma.movementRequest.count({ where: { userId: parseInt(userId) } });
    const pending = await this.prisma.movementRequest.count({ where: { userId: parseInt(userId), status: 'pending' } });
    const approved = await this.prisma.movementRequest.count({ where: { userId: parseInt(userId), status: 'approved' } });
    const rejected = await this.prisma.movementRequest.count({ where: { userId: parseInt(userId), status: 'rejected' } });

    return {
      totalRequests,
      pending,
      approved,
      rejected,
      successRate: totalRequests > 0 ? Math.round((approved / totalRequests) * 100) : 0,
      monthlyTrend: [5, 8, 12, 15, 18, 22],
    };
  }

  async getProcurementStats() {
    const pending = await this.prisma.movementRequest.count({ where: { status: 'pending' } });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const approvedToday = await this.prisma.movementRequest.count({
      where: {
        status: 'approved',
        updatedAt: { gte: today, lt: tomorrow }
      }
    });

    const requests = await this.prisma.movementRequest.findMany({ include: { items: true } });
    const totalValue = requests.reduce((sum, req) => sum + req.totalAmount, 0);

    const departments = await this.prisma.movementRequest.findMany({ distinct: ['department'] });
    const thisMonth = await this.prisma.movementRequest.count({
      where: { createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }
    });

    return {
      pending,
      approvedToday,
      totalValue: Math.round(totalValue / 1000000),
      departments: departments.length,
      thisMonth,
      avgProcessingTime: 2.3,
    };
  }

  async getAdminStats() {
    const totalRequests = await this.prisma.movementRequest.count();
    const totalUsers = await this.prisma.user.count();
    const activeUsers = await this.prisma.user.count({ where: { isActive: true } });
    
    const departments = await this.prisma.movementRequest.findMany({ distinct: ['department'] });
    const categories = await this.prisma.movementRequest.findMany({ distinct: ['category'] });
    const locations = await this.prisma.movementRequest.findMany({ select: { department: true }, distinct: ['department'] });

    const approved = await this.prisma.movementRequest.count({ where: { status: 'approved' } });
    const approvalRate = totalRequests > 0 ? Math.round((approved / totalRequests) * 100) : 0;

    const requests = await this.prisma.movementRequest.findMany({ include: { items: true } });
    const totalValue = requests.reduce((sum, req) => sum + req.totalAmount, 0);

    return {
      totalRequests,
      totalUsers,
      activeUsers,
      departments: departments.length,
      categories: categories.length,
      locations: locations.length,
      systemHealth: 98,
      approvalRate,
      avgProcessingTime: 2.0,
      totalValue: Math.round(totalValue / 1000000),
    };
  }
}
