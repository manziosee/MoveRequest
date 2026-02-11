import { Injectable } from '@nestjs/common';

export interface Notification {
  id: string;
  type: 'success' | 'pending' | 'info' | 'rejected';
  title: string;
  message: string;
  time: string;
  read: boolean;
  userId: string;
  createdAt: Date;
}

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [
    {
      id: '1',
      type: 'success',
      title: 'Request Approved',
      message: 'Your office equipment transfer request (REQ-045) has been approved.',
      time: '2 hours ago',
      read: false,
      userId: 'user1',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'pending',
      title: 'Pending Review',
      message: 'Your stationery request (REQ-046) is pending procurement approval.',
      time: '5 hours ago',
      read: false,
      userId: 'user1',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'info',
      title: 'New Comment',
      message: 'Sarah from Procurement commented on your request REQ-044.',
      time: '1 day ago',
      read: true,
      userId: 'user1',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  ];

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notifications.filter(n => n.userId === userId).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notifications.filter(n => n.userId === userId && !n.read).length;
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = this.notifications.find(n => n.id === notificationId && n.userId === userId);
    if (notification) {
      notification.read = true;
    }
    return { message: 'Notification marked as read' };
  }

  async markAllAsRead(userId: string) {
    this.notifications.forEach(n => {
      if (n.userId === userId) {
        n.read = true;
      }
    });
    return { message: 'All notifications marked as read' };
  }

  async createNotification(userId: string, type: Notification['type'], title: string, message: string): Promise<Notification> {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      time: 'Just now',
      read: false,
      userId,
      createdAt: new Date(),
    };
    this.notifications.unshift(notification);
    return notification;
  }
}
