import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementRequest, RequestStatus } from './entities/movement-request.entity';
import { RequestItem } from './entities/request-item.entity';
import { ApprovalHistory, ApprovalAction } from './entities/approval-history.entity';
import { CreateRequestDto, UpdateRequestStatusDto } from './dto/request.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(MovementRequest)
    private requestRepository: Repository<MovementRequest>,
    @InjectRepository(RequestItem)
    private itemRepository: Repository<RequestItem>,
    @InjectRepository(ApprovalHistory)
    private historyRepository: Repository<ApprovalHistory>,
  ) {}

  async create(createRequestDto: CreateRequestDto, user: User) {
    const request = this.requestRepository.create({
      ...createRequestDto,
      createdById: user.id,
      department: user.department,
    });

    const savedRequest = await this.requestRepository.save(request);

    const items = createRequestDto.items.map(item => 
      this.itemRepository.create({ ...item, requestId: savedRequest.id })
    );
    await this.itemRepository.save(items);

    await this.createHistoryEntry(savedRequest.id, ApprovalAction.CREATED, user);
    return this.findOne(savedRequest.id);
  }

  async findAll(user: User, filters?: { status?: string; priority?: string; department?: string }) {
    const query = this.requestRepository.createQueryBuilder('request')
      .leftJoinAndSelect('request.items', 'items')
      .leftJoinAndSelect('request.createdBy', 'createdBy')
      .leftJoinAndSelect('request.approvalHistory', 'history');

    if (user.role === 'employee') {
      query.where('request.createdById = :userId', { userId: user.id });
    }

    if (filters?.status) {
      query.andWhere('request.status = :status', { status: filters.status });
    }
    if (filters?.priority) {
      query.andWhere('request.priority = :priority', { priority: filters.priority });
    }
    if (filters?.department) {
      query.andWhere('request.department = :department', { department: filters.department });
    }

    query.orderBy('request.createdAt', 'DESC');
    return query.getMany();
  }

  async getStats(user: User) {
    const query = this.requestRepository.createQueryBuilder('request');
    
    if (user.role === 'employee') {
      query.where('request.createdById = :userId', { userId: user.id });
    }

    const total = await query.getCount();
    const pending = await query.clone().andWhere('request.status = :status', { status: 'pending' }).getCount();
    const approved = await query.clone().andWhere('request.status = :status', { status: 'approved' }).getCount();
    const rejected = await query.clone().andWhere('request.status = :status', { status: 'rejected' }).getCount();
    const draft = await query.clone().andWhere('request.status = :status', { status: 'draft' }).getCount();

    const successRate = total > 0 ? Math.round((approved / total) * 100) : 0;

    return {
      total,
      pending,
      approved,
      rejected,
      draft,
      successRate,
    };
  }

  async findOne(id: string) {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['items', 'createdBy', 'approvalHistory'],
    });

    if (!request) throw new NotFoundException('Request not found');
    return request;
  }

  async updateStatus(id: string, updateStatusDto: UpdateRequestStatusDto, user: User) {
    const request = await this.findOne(id);

    if (user.role === 'employee' && request.createdById !== user.id) {
      throw new ForbiddenException('You can only update your own requests');
    }

    if (updateStatusDto.status === RequestStatus.APPROVED || updateStatusDto.status === RequestStatus.REJECTED) {
      if (user.role !== 'procurement' && user.role !== 'admin') {
        throw new ForbiddenException('Only procurement staff can approve/reject requests');
      }
    }

    request.status = updateStatusDto.status;
    if (updateStatusDto.status === RequestStatus.REJECTED) {
      request.rejectionReason = updateStatusDto.comment;
    }

    await this.requestRepository.save(request);

    const action = updateStatusDto.status === RequestStatus.APPROVED ? ApprovalAction.APPROVED :
                  updateStatusDto.status === RequestStatus.REJECTED ? ApprovalAction.REJECTED :
                  updateStatusDto.status === RequestStatus.CANCELLED ? ApprovalAction.CANCELLED :
                  ApprovalAction.UPDATED;

    await this.createHistoryEntry(id, action, user, updateStatusDto.comment);
    return this.findOne(id);
  }

  async cancelRequest(id: string, reason: string, user: User) {
    const request = await this.findOne(id);
    
    if (request.createdById !== user.id) {
      throw new ForbiddenException('You can only cancel your own requests');
    }

    if (request.status !== 'pending' && request.status !== 'draft') {
      throw new ForbiddenException('Cannot cancel request in current status');
    }

    request.status = 'cancelled';
    await this.requestRepository.save(request);

    await this.createHistoryEntry(id, ApprovalAction.CANCELLED, user, reason);
    return this.findOne(id);
  }

  async updateRequest(id: string, updateData: Partial<CreateRequestDto>, user: User) {
    const request = await this.findOne(id);
    
    if (request.createdById !== user.id) {
      throw new ForbiddenException('You can only update your own requests');
    }

    if (request.status !== 'draft' && request.status !== 'rejected') {
      throw new ForbiddenException('Cannot edit request in current status');
    }

    Object.assign(request, updateData);
    await this.requestRepository.save(request);

    if (updateData.items) {
      await this.itemRepository.delete({ requestId: id });
      const items = updateData.items.map(item => 
        this.itemRepository.create({ ...item, requestId: id })
      );
      await this.itemRepository.save(items);
    }

    await this.createHistoryEntry(id, ApprovalAction.UPDATED, user);
    return this.findOne(id);
  }

  private async createHistoryEntry(requestId: string, action: ApprovalAction, user: User, comment?: string) {
    const history = this.historyRepository.create({
      requestId,
      action,
      performedBy: user.id,
      performedByName: user.name,
      comment,
    });

    return this.historyRepository.save(history);
  }
}