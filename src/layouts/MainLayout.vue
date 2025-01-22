<template>
  <q-layout :data-theme="dataTheme" class="overflow-hidden">
    <MainHeader :style="paddingStyle" />
    <LeftSideBar />
    <MyNotification />
    <q-page-container v-bind:style="{ ...paddingStyle, paddingTop: '66px' }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import LeftSideBar from "src/components/layout/main/LeftSideBar.vue";
import { useQuasar } from "quasar";
import useGlobalStore from "src/stores/useGlobalStore";
import MainHeader from "src/components/layout/main/MainHeader.vue";
import MyNotification from "src/modules/notification/component/MyNotification.vue";
import useNotificationStore from "src/modules/notification/stores/useNotificationStore";

const $q = useQuasar();
const globalStore = useGlobalStore();
const notificationStore = useNotificationStore();
const dataTheme = computed(() => (globalStore.theme.dark ? "dark" : null));
const paddingStyle = computed(() => {
  return {
    marginInline: $q.screen.lt.md
      ? "16px"
      : globalStore.leftDrawerMini
        ? `124px ${notificationStore.popupVisible ? "416px" : "16px"}`
        : `300px ${notificationStore.popupVisible ? "416px" : "16px"}`,
    zIndex: 1000,
    transition: "margin 0.3s !important",
  };
});
</script>
