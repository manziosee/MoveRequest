import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async getUserNotifications(userId: number) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUnreadCount(userId: number) {
    return this.prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  async markAsRead(notificationId: number, userId: number) {
    await this.prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { isRead: true },
    });
    return { message: 'Notification marked as read' };
  }

  async markAllAsRead(userId: number) {
    await this.prisma.notification.updateMany({
      where: { userId },
      data: { isRead: true },
    });
    return { message: 'All notifications marked as read' };
  }

  async createNotification(
    userId: number,
    type: string,
    title: string,
    message: string,
  ) {
    const notification = await this.prisma.notification.create({
      data: { userId, type, title, message },
    });

    // Send real-time notification via WebSocket
    this.notificationsGateway.sendNotificationToUser(userId, notification);

    return notification;
  }
}
