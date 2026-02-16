import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [total, pending, approved, rejected] = await Promise.all([
      this.prisma.movementRequest.count(),
      this.prisma.movementRequest.count({ where: { status: 'pending' } }),
      this.prisma.movementRequest.count({ where: { status: 'approved' } }),
      this.prisma.movementRequest.count({ where: { status: 'rejected' } }),
    ]);
    return { total, pending, approved, rejected };
  }

  async getMonthlyTrends() {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const requests = await this.prisma.movementRequest.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    });

    const counts: Record<string, number> = {};
    requests.forEach((req) => {
      const key = `${req.createdAt.getFullYear()}-${req.createdAt.getMonth()}`;
      counts[key] = (counts[key] || 0) + 1;
    });

    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      return { month: monthNames[d.getMonth()], count: counts[key] || 0 };
    });
  }

  async getDepartmentStats() {
    return this.prisma.movementRequest.groupBy({
      by: ['department'],
      _count: true,
    });
  }

  async getStatusDistribution() {
    const [pending, approved, rejected, draft] = await Promise.all([
      this.prisma.movementRequest.count({ where: { status: 'pending' } }),
      this.prisma.movementRequest.count({ where: { status: 'approved' } }),
      this.prisma.movementRequest.count({ where: { status: 'rejected' } }),
      this.prisma.movementRequest.count({ where: { status: 'draft' } }),
    ]);
    return { pending, approved, rejected, draft };
  }

  async getPriorityBreakdown() {
    const [low, medium, high, urgent] = await Promise.all([
      this.prisma.movementRequest.count({ where: { priority: 'low' } }),
      this.prisma.movementRequest.count({ where: { priority: 'medium' } }),
      this.prisma.movementRequest.count({ where: { priority: 'high' } }),
      this.prisma.movementRequest.count({ where: { priority: 'urgent' } }),
    ]);
    return { low, medium, high, urgent };
  }

  async exportData(format: string) {
    const data = await this.getDashboardStats();
    return { format, data, message: `Report exported as ${format}` };
  }

  async getRequestsSummary() {
    return this.getDashboardStats();
  }

  async getDepartmentReport() {
    return this.getDepartmentStats();
  }

  async getUserReport() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, firstName: true, lastName: true, role: true, department: true },
    });
  }

  async getFinancialReport() {
    const requests = await this.prisma.movementRequest.findMany({
      include: { items: true },
    });
    const totalValue = requests.reduce((sum, req) => sum + req.totalAmount, 0);
    return { totalValue, requestCount: requests.length };
  }

  async exportReport(format: string) {
    return this.exportData(format);
  }
}
