import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ApprovalsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async getPendingRequests() {
    return this.prisma.movementRequest.findMany({
      where: { status: 'pending' },
      include: { items: true, user: true, approvals: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getApprovalStats() {
    const pending = await this.prisma.movementRequest.count({ where: { status: 'pending' } });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const approvedToday = await this.prisma.movementRequest.count({
      where: { status: 'approved', updatedAt: { gte: today } },
    });
    return { pending, approvedToday, avgProcessingTime: 2.1, approvalRate: 94 };
  }

  async approveRequest(requestId: number, comment: string, approverId: number) {
    const request = await this.prisma.movementRequest.findUnique({
      where: { id: requestId },
      include: { user: true },
    });

    if (!request) throw new Error('Request not found');

    await this.prisma.movementRequest.update({ 
      where: { id: requestId }, 
      data: { status: 'approved' } 
    });
    
    await this.prisma.approval.create({ 
      data: { requestId, approverId, status: 'approved', comments: comment } 
    });

    // Notify the requester with real-time notification
    await this.notificationsService.createNotification(
      request.userId,
      'success',
      'Request Approved',
      `Your request "${request.title}" has been approved.${comment ? ` Comment: ${comment}` : ''}`,
    );

    return this.prisma.movementRequest.findUnique({ 
      where: { id: requestId }, 
      include: { items: true, user: true } 
    });
  }

  async rejectRequest(requestId: number, reason: string, approverId: number) {
    const request = await this.prisma.movementRequest.findUnique({
      where: { id: requestId },
      include: { user: true },
    });

    if (!request) throw new Error('Request not found');

    await this.prisma.movementRequest.update({ 
      where: { id: requestId }, 
      data: { status: 'rejected' } 
    });
    
    await this.prisma.approval.create({ 
      data: { requestId, approverId, status: 'rejected', comments: reason } 
    });

    // Notify the requester with real-time notification
    await this.notificationsService.createNotification(
      request.userId,
      'error',
      'Request Rejected',
      `Your request "${request.title}" has been rejected. Reason: ${reason}`,
    );

    return this.prisma.movementRequest.findUnique({ 
      where: { id: requestId }, 
      include: { items: true, user: true } 
    });
  }

  async bulkApprove(requestIds: number[], approverId: number) {
    for (const id of requestIds) {
      await this.approveRequest(id, 'Bulk approval', approverId);
    }
    return { approved: requestIds.length, requestIds };
  }
}