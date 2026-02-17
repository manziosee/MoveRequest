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

    const departments = await this.prisma.movementRequest.groupBy({
      by: ['department'],
    });
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

    const departments = await this.prisma.department.count();
    const categories = await this.prisma.category.count();
    const locations = await this.prisma.movementRequest.groupBy({
      by: ['department'],
    });

    const pending = await this.prisma.movementRequest.count({ where: { status: 'pending' } });
    const approved = await this.prisma.movementRequest.count({ where: { status: 'approved' } });
    const rejected = await this.prisma.movementRequest.count({ where: { status: 'rejected' } });
    const approvalRate = totalRequests > 0 ? Math.round((approved / totalRequests) * 100) : 0;

    const requests = await this.prisma.movementRequest.findMany({ include: { items: true } });
    const totalValue = requests.reduce((sum, req) => sum + req.totalAmount, 0);

    // Role distribution for pie chart
    const users = await this.prisma.user.findMany({ select: { role: true } });
    const roleDistribution = [
      { name: 'Employee', value: users.filter(u => u.role === 'employee').length },
      { name: 'Procurement', value: users.filter(u => u.role === 'procurement').length },
      { name: 'Admin', value: users.filter(u => u.role === 'admin').length },
    ];

    // Request status breakdown for pie chart
    const statusDistribution = [
      { name: 'Pending', value: pending },
      { name: 'Approved', value: approved },
      { name: 'Rejected', value: rejected },
    ];

    // Monthly request trends (last 6 months)
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const recentRequests = await this.prisma.movementRequest.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true, status: true },
    });
    const monthlyCounts: Record<string, { total: number; approved: number; rejected: number }> = {};
    recentRequests.forEach((req) => {
      const key = `${req.createdAt.getFullYear()}-${req.createdAt.getMonth()}`;
      if (!monthlyCounts[key]) monthlyCounts[key] = { total: 0, approved: 0, rejected: 0 };
      monthlyCounts[key].total += 1;
      if (req.status === 'approved') monthlyCounts[key].approved += 1;
      if (req.status === 'rejected') monthlyCounts[key].rejected += 1;
    });
    const monthlyTrends = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const data = monthlyCounts[key] || { total: 0, approved: 0, rejected: 0 };
      return { month: monthNames[d.getMonth()], total: data.total, approved: data.approved, rejected: data.rejected };
    });

    // Department activity for bar chart
    const deptRequests = await this.prisma.movementRequest.groupBy({
      by: ['department'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 6,
    });
    const departmentActivity = deptRequests.map(d => ({
      name: d.department || 'Unknown',
      requests: d._count.id,
    }));

    return {
      totalRequests,
      totalUsers,
      activeUsers,
      departments,
      categories,
      locations: locations.length,
      systemHealth: 98,
      approvalRate,
      avgProcessingTime: 2.0,
      totalValue: Math.round(totalValue / 1000000),
      pending,
      approved,
      rejected,
      roleDistribution,
      statusDistribution,
      monthlyTrends,
      departmentActivity,
    };
  }
}
