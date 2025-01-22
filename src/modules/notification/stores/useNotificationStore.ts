import { defineStore } from "pinia";
import { formatDateTime } from "src/shared/utils";

type NotificationState = {
  unreadCount: number;
  lastRequest: string;
  popupVisible: boolean;
};
const NOTIFICATION_UNREAD_COUNT = "unread_count";
const NOTIFICATION_LAST_REFRESH = "last_refresh";
export default defineStore("notification", {
  state: (): NotificationState => {
    const count = localStorage.getItem(NOTIFICATION_UNREAD_COUNT) || "0";
    const lastRequest = localStorage.getItem(NOTIFICATION_LAST_REFRESH);
    return {
      unreadCount: JSON.parse(count) ?? 0,
      lastRequest: lastRequest ? JSON.parse(lastRequest) : null,
      popupVisible: false,
    };
  },
  actions: {
    setReadCount(count: number) {
      this.unreadCount = count;
      this.lastRequest = formatDateTime(new Date(), "DD/MM/YYYY HH:mm:ss");
      localStorage.setItem(NOTIFICATION_UNREAD_COUNT, JSON.stringify(count));
      localStorage.setItem(
        NOTIFICATION_LAST_REFRESH,
        JSON.stringify(formatDateTime(new Date(), "DD/MM/YYYY HH:mm:ss")),
      );
    },
  },
});
