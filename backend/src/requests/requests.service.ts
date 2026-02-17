import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../common/email.service';

@Injectable()
export class RequestsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    private emailService: EmailService,
  ) {}

  async create(data: any, userId: number) {
    const request = await this.prisma.movementRequest.create({
      data: {
        ...data,
        userId,
        items: { create: data.items || [] },
      },
      include: { items: true, user: true },
    });

    // Notify all procurement users
    const procurementUsers = await this.prisma.user.findMany({
      where: { role: 'procurement', isActive: true },
    });

    const employeeName = `${request.user.firstName} ${request.user.lastName}`;

    for (const procUser of procurementUsers) {
      await this.notificationsService.createNotification(
        procUser.id,
        'info',
        'New Request Submitted',
        `${employeeName} submitted a new request: ${request.title}`,
      );

      // Send email notification to procurement user
      await this.emailService.sendNewRequestNotification(
        procUser.email,
        request.title,
        request.id,
        employeeName,
      );
    }

    // Send confirmation email to the employee
    await this.emailService.sendRequestSubmittedEmail(
      request.user.email,
      request.title,
      request.id,
    );

    return request;
  }

  async findAll(userId: number, role: string, filters?: any) {
    const where: any = role === 'employee' ? { userId } : {};
    if (filters?.status) where.status = filters.status;
    if (filters?.priority) where.priority = filters.priority;
    if (filters?.department) where.department = filters.department;

    return this.prisma.movementRequest.findMany({
      where,
      include: { items: true, user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.movementRequest.findUnique({
      where: { id },
      include: { items: true, user: true, approvals: { include: { approver: true } } },
    });
  }

  async getStats(userId: number, role: string) {
    const where = role === 'employee' ? { userId } : {};
    const [total, pending, approved, rejected, draft] = await Promise.all([
      this.prisma.movementRequest.count({ where }),
      this.prisma.movementRequest.count({ where: { ...where, status: 'pending' } }),
      this.prisma.movementRequest.count({ where: { ...where, status: 'approved' } }),
      this.prisma.movementRequest.count({ where: { ...where, status: 'rejected' } }),
      this.prisma.movementRequest.count({ where: { ...where, status: 'draft' } }),
    ]);
    const successRate = total > 0 ? Math.round((approved / total) * 100) : 0;
    return { total, pending, approved, rejected, draft, successRate };
  }

  async update(id: number, data: any) {
    return this.prisma.movementRequest.update({
      where: { id },
      data,
      include: { items: true, user: true },
    });
  }

  async delete(id: number) {
    return this.prisma.movementRequest.delete({ where: { id } });
  }
}