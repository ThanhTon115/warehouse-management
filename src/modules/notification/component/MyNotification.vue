<template>
  <div
    :class="`fixed top-0 right-0 bg-transparent h-full p-4 notification-list--${notificationStore.popupVisible ? 'shown' : 'hidden'} notification-list--${displayMode === 'popup' ? 'popup' : 'card'}`"
  >
    <div
      class="w-[calc(100%-32px)] h-[calc(100%-32px)] bg-black/[.05] backdrop-blur-md absolute rounded-[28px]"
    ></div>
    <q-card
      flat
      style="width: 384px; max-width: 80vw"
      class="rounded-[28px] h-full bg-transparent overflow-hidden"
    >
      <q-item
        class="justify-between p-4"
        style="position: sticky; top: 0; z-index: 3"
      >
        <q-item-section>
          <span class="text-uppercase text-primary text-bold">
            {{ i18n.t("label.notification") }}
          </span>
        </q-item-section>
        <q-item-section avatar>
          <q-btn :icon="ICON_CLOSE" round flat dense @click="onClose" />
        </q-item-section>
      </q-item>
      <NotificationList />
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { ICON_CLOSE } from "src/shared/themes/types";
import { useI18n } from "vue-i18n";
import useNotificationStore from "../stores/useNotificationStore";
import { ref, watch } from "vue";
import { useQuasar } from "quasar";
import NotificationList from "./NotificationList.vue";

const $q = useQuasar();
const i18n = useI18n();
const notificationStore = useNotificationStore();
const displayMode = ref($q.screen.sm ? "popup" : "card");

const onClose = () => {
  notificationStore.popupVisible = false;
};

watch(
  () => [$q.screen.sm, $q.screen.md],
  (newVal, oldVal) => {
    if (newVal[0] && oldVal[1] && displayMode.value === "card") {
      displayMode.value = "popup";
      return;
    }
    if (newVal[1] && oldVal[0] && displayMode.value === "popup") {
      displayMode.value = "card";
    }
  },
);
</script>
<style lang="scss">
.notification-list {
  &--card {
    height: 100dvh;
    .customized-tab-panel__content {
      .customized-scroll-list {
        max-height: calc(100dvh - 164px);
        overflow-y: auto;
      }
    }
  }
  &--hidden {
    transform: translateX(416px);
    transition: all 0.3s;
  }
  &--shown {
    transform: translateX(0);
    transition: all 0.3s;
  }
  &--popup {
    z-index: 1000;
  }
}
</style>
