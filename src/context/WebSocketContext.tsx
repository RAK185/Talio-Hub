import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { AppNotification, Application } from '../types';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

interface WebSocketContextType {
  notifications: AppNotification[];
  unreadCount: number;
  latestUpdatedApplication: Application | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();
  const { showToast } = useTheme();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [latestUpdatedApplication, setLatestUpdatedApplication] = useState<Application | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Fetch initial notifications
  const fetchNotifications = useCallback(async () => {
    if (!token || !user) return;
    try {
      const res = await fetch('/api/notifications/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  }, [token, user]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Firestore Realtime Listener for Applications & Notifications
  useEffect(() => {
    if (!user) return;

    try {
      // Listen for notification updates in Firestore
      const notifQuery = query(
        collection(db, 'notifications'),
        where('applicantId', '==', user.id)
      );

      const unsubscribeNotif = onSnapshot(
        notifQuery,
        (snapshot) => {
          const fsNotifs: AppNotification[] = [];
          snapshot.forEach((doc) => {
            fsNotifs.push({ ...(doc.data() as AppNotification), id: doc.id });
          });

          if (fsNotifs.length > 0) {
            setNotifications((prev) => {
              // Merge Firestore notifications with existing ones uniquely
              const map = new Map<string, AppNotification>();
              [...fsNotifs, ...prev].forEach((n) => map.set(n.id, n));
              return Array.from(map.values()).sort(
                (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
              );
            });
          }
        },
        (error) => {
          console.warn('Firestore onSnapshot notice:', error.message);
        }
      );

      return () => {
        unsubscribeNotif();
      };
    } catch (err) {
      console.warn('Firestore real-time subscription fallback:', err);
    }
  }, [user]);

  // WebSocket connection for instant status updates & toast alerts
  useEffect(() => {
    if (!user) {
      setIsConnected(false);
      return;
    }

    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProtocol}//${window.location.host}/ws?userId=${user.id}`;

    let socket: WebSocket | null = null;
    let pingInterval: ReturnType<typeof setInterval>;

    const connectWS = () => {
      try {
        socket = new WebSocket(wsUrl);

        socket.onopen = () => {
          setIsConnected(true);
          pingInterval = setInterval(() => {
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ type: 'PING' }));
            }
          }, 25000);
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'STATUS_UPDATE') {
              const { application, notification } = data;

              setLatestUpdatedApplication(application);

              if (notification) {
                setNotifications((prev) => [notification, ...prev.filter((n) => n.id !== notification.id)]);

                // Trigger Toast Alert!
                const statusColor =
                  notification.status === 'Accepted'
                    ? 'success'
                    : notification.status === 'Rejected'
                    ? 'error'
                    : 'info';

                showToast(
                  `🎉 Real-time Update: Application for "${application.jobTitle}" is now ${application.status}!`,
                  statusColor
                );
              }
            }
          } catch (e) {
            console.error('WebSocket message parse error:', e);
          }
        };

        socket.onclose = () => {
          setIsConnected(false);
          clearInterval(pingInterval);
        };

        socket.onerror = (err) => {
          console.warn('WebSocket socket notice:', err);
        };
      } catch (err) {
        console.warn('WebSocket connection error:', err);
      }
    };

    connectWS();

    return () => {
      if (socket) {
        socket.close();
      }
      clearInterval(pingInterval);
    };
  }, [user, showToast]);

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    if (token) {
      try {
        await fetch(`/api/notifications/${id}/read`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Failed to mark read:', err);
      }
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    if (token) {
      try {
        await fetch('/api/notifications/read-all', {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Failed to mark all read:', err);
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <WebSocketContext.Provider
      value={{
        notifications,
        unreadCount,
        latestUpdatedApplication,
        markAsRead,
        markAllAsRead,
        isConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocket must be used within WebSocketProvider');
  return context;
};
