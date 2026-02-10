import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementRequest } from '../requests/entities/movement-request.entity';
import { User } from '../users/entities/user.entity';
import { RequestItem } from '../requests/entities/request-item.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(MovementRequest)
    private requestRepository: Repository<MovementRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RequestItem)
    private itemRepository: Repository<RequestItem>,
  ) {}

  async getEmployeeStats(userId: string) {
    const totalRequests = await this.requestRepository.count({ where: { createdBy: { id: userId } } });
    const pending = await this.requestRepository.count({ where: { createdBy: { id: userId }, status: 'pending' } });
    const approved = await this.requestRepository.count({ where: { createdBy: { id: userId }, status: 'approved' } });
    const rejected = await this.requestRepository.count({ where: { createdBy: { id: userId }, status: 'rejected' } });

    return {
      totalRequests,
      pending,
      approved,
      rejected,
      successRate: totalRequests > 0 ? Math.round((approved / totalRequests) * 100) : 0,
      monthlyTrend: [12, 15, 18, 22, 25, 20],
    };
  }

  async getProcurementStats() {
    const pending = await this.requestRepository.count({ where: { status: 'pending' } });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const approvedToday = await this.requestRepository.count({
      where: { status: 'approved', updatedAt: today as any },
    });

    return {
      pending,
      approvedToday,
      avgProcessingTime: 2.1,
      approvalRate: 94,
      monthlyTrend: [45, 52, 48, 61, 58, 65],
    };
  }

  async getAdminStats() {
    const totalRequests = await this.requestRepository.count();
    const totalUsers = await this.userRepository.count();
    const activeUsers = await this.userRepository.count({ where: { isActive: true } });
    
    const departments = await this.requestRepository
      .createQueryBuilder('request')
      .select('DISTINCT request.department')
      .getRawMany();

    const approved = await this.requestRepository.count({ where: { status: 'approved' } });
    const approvalRate = totalRequests > 0 ? Math.round((approved / totalRequests) * 100) : 0;

    const totalValue = await this.itemRepository
      .createQueryBuilder('item')
      .select('SUM(item.quantity * item.estimatedCost)', 'total')
      .getRawOne();

    return {
      totalRequests,
      totalUsers,
      activeUsers,
      departments: departments.length,
      approvalRate,
      avgProcessingTime: 2.0,
      totalValue: Math.round(totalValue?.total || 108000000),
      systemHealth: 98,
    };
  }
}
