import { Injectable } from '@nestjs/common';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: Date;
}

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Request Approved',
      message: 'Your office equipment transfer request has been approved',
      userId: '1',
      read: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'warning',
      title: 'Pending Review',
      message: 'Your stationery request is awaiting procurement review',
      userId: '1',
      read: false,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
  ];

  async getUserNotifications(userId: string) {
    return this.notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) notification.read = true;
    return { message: 'Notification marked as read' };
  }

  async markAllAsRead(userId: string) {
    this.notifications
      .filter(n => n.userId === userId)
      .forEach(n => n.read = true);
    return { message: 'All notifications marked as read' };
  }
}