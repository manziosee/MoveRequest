'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function useNotifications(userId: number | null) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Connect to WebSocket
    socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
      query: { userId: userId.toString() },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to notifications');
    });

    socket.on('notification', (notification: any) => {
      console.log('New notification:', notification);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Show browser notification if permitted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/logo.png',
        });
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from notifications');
    });

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [userId]);

  return { notifications, unreadCount, setNotifications, setUnreadCount };
}
