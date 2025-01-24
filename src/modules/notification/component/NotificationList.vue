<template>
  <div class="px-4 notification-items">
    <XTabs :tabs="tabs" default-tab="all">
      <template #label="{ item }">
        <q-icon
          v-if="item?.icon"
          :name="item?.icon"
          size="24px"
          :data-theme="theme.dark ? 'dark' : 'light'"
        >
          <q-tooltip>{{ item?.label }}</q-tooltip>
        </q-icon>

        <span v-else-if="item?.label">{{ item?.label }}</span>
      </template>
      <XScrollList class="p-4">
        <template #default="{ customizedStyles }">
          <NotificationItem
            v-for="(noti, index) in Array.from({ length: 20 })?.flatMap(
              (e) => notifications,
            )"
            :style="customizedStyles[index]"
            :key="noti.id"
            :model-value="noti"
            :class="`text-black bg-slate-400/10 rounded-xl p-4 transition-all duration-300 ease-linear mb-2`"
          >
            {{ noti.description }}
          </NotificationItem>
        </template>
      </XScrollList>
    </XTabs>
  </div>
</template>
<script setup lang="ts">
import XScrollList from "src/components/core/display/XScrollList.vue";
import XTabs from "src/components/core/display/XTabs.vue";
import XText from "src/components/core/display/XText.vue";
import {
  ICON_MAIL,
  ICON_READ_NOTIFICATION,
  ICON_UNREAD_NOTIFICATION,
} from "src/shared/themes/types";
import useGlobalStore from "src/stores/useGlobalStore";
import { useI18n } from "vue-i18n";
import NotificationItem, { NotificationType } from "./NotificationItem.vue";
const i18n = useI18n();
const { theme } = useGlobalStore();
const tabs = [
  {
    name: "all",
    label: i18n.t(`notification.label.all`),
    icon: ICON_MAIL,
  },
  {
    name: "unread",
    label: i18n.t(`notification.label.unread`),
    icon: ICON_UNREAD_NOTIFICATION,
  },
  {
    name: "read",
    label: i18n.t(`notification.label.read`),
    icon: ICON_READ_NOTIFICATION,
  },
];
const notifications: NotificationType[] = [
  {
    id: 1,
    title: "Xin chào Việt Nam",
    description: "Ngày mai dìa quê",
    read: false,
  },
  {
    id: 2,
    title: "Xin chào Việt Nam",
    description: "Ngày mai dìa quê",
    read: false,
  },
  {
    id: 3,
    title: "Xin chào Việt Nam",
    description: "Ngày mai dìa quê",
    read: false,
  },
];
</script>
<style lang="scss">
.q-tab {
  &--inactive {
    i {
      color: var(--text-primary);
    }
  }
}
.notification-items {
  .customized-tab-panel__content {
    border-radius: 0 0 16px 16px;
  }
}
</style>
