<template>
  <q-icon
    :name="ICON_NOTIFICATION"
    color="primary"
    size="20px"
    class="cursor-pointer rounded-full"
    @click="openDialog"
  >
    <q-badge color="red" floating rounded />
  </q-icon>
  <!-- <CustomizedDialog
    :model-value="dialogVisible"
    position="right"
    maximized
    @hide="onClose"
    persistent
  >
    <q-card style="width: 384px; max-width: 80vw">
      <q-item
        class="justify-between bg-white"
        style="position: sticky; top: 0; z-index: 3"
      >
        <q-item-section>
          <span class="text-uppercase text-primary">
            {{ i18n.t("label.notification") }}
          </span>
        </q-item-section>
        <q-item-section avatar>
          <q-btn :icon="ICON_CLOSE" round flat dense @click="onClose" />
        </q-item-section> </q-item></q-card
  ></CustomizedDialog> -->
</template>
<script setup lang="ts">
import { ICON_NOTIFICATION } from "src/shared/themes/types";
import useNotificationStore from "../stores/useNotificationStore";
const notificationStore = useNotificationStore();

const openDialog = () => {
  notificationStore.popupVisible = !notificationStore.popupVisible;
};
</script>
<style lang=""></style>
