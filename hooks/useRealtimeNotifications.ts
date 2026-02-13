import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
// Extract base URL for WebSocket (remove /api suffix if present)
const WS_URL = API_URL.replace(/\/api$/, '');

export function useRealtimeNotifications(userId: number | null, onNotification?: (notification: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Connect to WebSocket
    const socket = io(WS_URL, {
      query: { userId: userId.toString() },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('notification', (notification: any) => {
      console.log('Received notification:', notification);
      
      // Show toast notification
      const toastType = notification.type === 'success' ? toast.success :
                       notification.type === 'error' ? toast.error :
                       notification.type === 'warning' ? toast.warning :
                       toast.info;
      
      toastType(notification.title, {
        description: notification.message,
      });

      // Call custom handler if provided
      if (onNotification) {
        onNotification(notification);
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, onNotification]);

  return socketRef.current;
}
