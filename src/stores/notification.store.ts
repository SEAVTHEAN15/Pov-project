import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: Date | string;
  date?: string; // Add optional date string for template formatting
  read: boolean;
}

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<NotificationItem[]>([]);

  // Computed: Unread count
  const unreadCount = computed(() => {
    return notifications.value.filter((n) => !n.read).length;
  });

  // Action: Add notification
  const addNotification = (title: string, message: string) => {
    notifications.value.unshift({
      id: Date.now().toString(),
      title,
      message,
      createdAt: new Date(),
      date: new Date().toLocaleDateString(),
      read: false,
    });
  };

  // Action: Remove single notification
  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
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
    markAllAsRead,
    clearAllNotifications,
  };
});
