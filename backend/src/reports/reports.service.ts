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
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = [45, 52, 61, 58, 67, 73];
    return months.map((month, i) => ({ month, count: data[i] }));
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
