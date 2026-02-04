import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementRequest } from '../requests/entities/movement-request.entity';
import { ApprovalHistory } from '../requests/entities/approval-history.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ApprovalsService {
  constructor(
    @InjectRepository(MovementRequest)
    private requestRepository: Repository<MovementRequest>,
    @InjectRepository(ApprovalHistory)
    private historyRepository: Repository<ApprovalHistory>,
  ) {}

  async getPendingRequests() {
    return this.requestRepository.find({
      where: { status: 'pending' },
      relations: ['items', 'createdBy', 'approvalHistory'],
      order: { createdAt: 'DESC' },
    });
  }

  async getApprovalStats() {
    const pending = await this.requestRepository.count({ where: { status: 'pending' } });
    const approvedToday = await this.requestRepository
      .createQueryBuilder('request')
      .where('request.status = :status', { status: 'approved' })
      .andWhere('DATE(request.updatedAt) = DATE(NOW())')
      .getCount();

    const avgProcessingTime = await this.requestRepository
      .createQueryBuilder('request')
      .select('AVG(JULIANDAY(request.updatedAt) - JULIANDAY(request.createdAt))', 'avgDays')
      .where('request.status IN (:...statuses)', { statuses: ['approved', 'rejected'] })
      .getRawOne();

    const approvalRate = await this.requestRepository
      .createQueryBuilder('request')
      .select('COUNT(CASE WHEN status = "approved" THEN 1 END) * 100.0 / COUNT(*)', 'rate')
      .where('request.status IN (:...statuses)', { statuses: ['approved', 'rejected'] })
      .getRawOne();

    return {
      pending,
      approvedToday,
      avgProcessingTime: Math.round((avgProcessingTime?.avgDays || 2.1) * 10) / 10,
      approvalRate: Math.round(approvalRate?.rate || 94),
    };
  }

  async bulkApprove(requestIds: string[], user: User) {
    const results = [];
    for (const id of requestIds) {
      await this.requestRepository.update(id, { status: 'approved', approvedById: user.id });
      await this.historyRepository.save({
        requestId: id,
        action: 'approved',
        performedBy: user.id,
        performedByName: user.name,
        comment: 'Bulk approval',
      });
      results.push(id);
    }
    return { approved: results.length, requestIds: results };
  }
}