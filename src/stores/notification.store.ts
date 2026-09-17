import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  date: string;
  read: boolean;
}

const NOTIFICATIONS_STORAGE_KEY = "pinky_notifications";

export const useNotificationStore = defineStore("notification", () => {
  // Safe initial state loading from localStorage
  const loadNotifications = (): NotificationItem[] => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse notifications from localStorage:", e);
      return [];
    }
  };

  const notifications = ref<NotificationItem[]>(loadNotifications());

  // Automatically sync state to localStorage
  watch(
    notifications,
    (newNotifications) => {
      localStorage.setItem(
        NOTIFICATIONS_STORAGE_KEY,
        JSON.stringify(newNotifications),
      );
    },
    { deep: true },
  );

  // Computed: Unread count
  const unreadCount = computed(() => {
    return notifications.value.filter((n) => !n.read).length;
  });

  // Action: Add notification
  const addNotification = (title: string, message: string) => {
    const now = new Date();
    const newNotif: NotificationItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title,
      message,
      createdAt: now.toISOString(),
      date:
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        ", " +
        now.toLocaleDateString(),
      read: false,
    };

    notifications.value.unshift(newNotif);
  };

  // Action: Remove single notification
  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  // Action: Mark single notification as read
  const markAsRead = (id: string) => {
    const target = notifications.value.find((n) => n.id === id);
    if (target) {
      target.read = true;
    }
  };

  // Action: Mark all notifications as read
  const markAllAsRead = () => {
    notifications.value.forEach((n) => {
      n.read = true;
    });
  };

  // Action: Clear all notifications
  const clearAllNotifications = () => {
    notifications.value = [];
  };

  return {
    notifications,
    unreadCount,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
  };
});
