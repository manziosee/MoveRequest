import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementRequest } from '../requests/entities/movement-request.entity';
import { RequestItem } from '../requests/entities/request-item.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(MovementRequest)
    private requestRepository: Repository<MovementRequest>,
    @InjectRepository(RequestItem)
    private itemRepository: Repository<RequestItem>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getDashboardStats() {
    const totalRequests = await this.requestRepository.count();
    const approvalRate = await this.requestRepository
      .createQueryBuilder('request')
      .select('COUNT(CASE WHEN status = "approved" THEN 1 END) * 100.0 / COUNT(*)', 'rate')
      .where('request.status IN (:...statuses)', { statuses: ['approved', 'rejected'] })
      .getRawOne();

    const totalValue = await this.itemRepository
      .createQueryBuilder('item')
      .select('SUM(item.quantity * item.estimatedCost)', 'total')
      .getRawOne();

    const avgProcessingTime = 2.0; // Mock data

    return {
      totalRequests,
      approvalRate: Math.round(approvalRate?.rate || 80),
      totalValue: Math.round(totalValue?.total || 108000000),
      avgProcessingTime,
    };
  }

  async getMonthlyTrends() {
    const monthlyData = await this.requestRepository
      .createQueryBuilder('request')
      .select('strftime("%m", request.createdAt)', 'month')
      .addSelect('COUNT(*)', 'total')
      .addSelect('COUNT(CASE WHEN status = "approved" THEN 1 END)', 'approved')
      .addSelect('COUNT(CASE WHEN status = "rejected" THEN 1 END)', 'rejected')
      .addSelect('COUNT(CASE WHEN status = "pending" THEN 1 END)', 'pending')
      .groupBy('strftime("%m", request.createdAt)')
      .orderBy('month')
      .getRawMany();

    return monthlyData.map(item => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][parseInt(item.month) - 1],
      total: parseInt(item.total),
      approved: parseInt(item.approved),
      rejected: parseInt(item.rejected),
      pending: parseInt(item.pending),
    }));
  }

  async getDepartmentStats() {
    const departmentData = await this.requestRepository
      .createQueryBuilder('request')
      .leftJoin('request.items', 'items')
      .select('request.department', 'name')
      .addSelect('COUNT(request.id)', 'count')
      .addSelect('SUM(items.quantity * items.estimatedCost)', 'value')
      .groupBy('request.department')
      .getRawMany();

    return departmentData.map(item => ({
      name: item.name,
      count: parseInt(item.count),
      value: Math.round(item.value || 0),
      percentage: Math.round((parseInt(item.count) / departmentData.length) * 100),
    }));
  }

  async getStatusDistribution() {
    const statusData = await this.requestRepository
      .createQueryBuilder('request')
      .select('request.status', 'name')
      .addSelect('COUNT(*)', 'value')
      .groupBy('request.status')
      .getRawMany();

    const total = statusData.reduce((sum, item) => sum + parseInt(item.value), 0);
    
    return statusData.map(item => ({
      name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
      value: parseInt(item.value),
      percentage: Math.round((parseInt(item.value) / total) * 100),
    }));
  }

  async getPriorityBreakdown() {
    const priorityData = await this.requestRepository
      .createQueryBuilder('request')
      .select('request.priority', 'priority')
      .addSelect('COUNT(*)', 'count')
      .groupBy('request.priority')
      .getRawMany();

    const total = priorityData.reduce((sum, item) => sum + parseInt(item.count), 0);

    return priorityData.map(item => ({
      priority: item.priority.charAt(0).toUpperCase() + item.priority.slice(1),
      count: parseInt(item.count),
      percentage: Math.round((parseInt(item.count) / total) * 100),
    }));
  }

  async exportData(format: string) {
    const requests = await this.requestRepository.find({
      relations: ['items', 'createdBy'],
    });

    if (format === 'csv') {
      const csvData = requests.map(req => ({
        id: req.id,
        title: req.title,
        status: req.status,
        priority: req.priority,
        department: req.department,
        createdBy: req.createdBy?.name,
        createdAt: req.createdAt,
        totalCost: req.items?.reduce((sum, item) => sum + (item.quantity * item.estimatedCost), 0) || 0,
      }));
      return { data: csvData, format: 'csv' };
    }

    return { data: requests, format };
  }
}