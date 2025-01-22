<template>
  <q-card
    flat
    v-bind="{ ...attrs }"
    :class="`flex row ${props.class}`"
    :style="props.style"
  >
    <div class="col-2"></div>
    <div class="col-9">
      <div class="text-bold">{{ props.modelValue?.title }}</div>
      <div class="text-ellipsis line-clamp-2">
        {{ props.modelValue?.description }}
      </div>
      <span class="text-xs text-secondary">{{
        formatDateTime(
          props.modelValue?.createdAt
            ? new Date(props.modelValue?.createdAt)
            : new Date(),
          "HH:mm DD/MM/YYYY",
        )
      }}</span>
    </div>
    <div class="col-1">
      <q-badge v-if="!props.modelValue?.read" rounded color="red"></q-badge>
    </div>
  </q-card>
</template>
<script setup lang="ts">
import { ClassProp } from "src/shared/themes/types";
import { formatDateTime } from "src/shared/utils";
import { computed, StyleValue, useAttrs } from "vue";

export type NotificationType = {
  id: string | number;
  type?: string;
  user?: {
    avtUrl?: string;
    displayName: string;
  };
  title: string;
  createdAt?: string | Date;
  description: string;
  read: boolean;
};
const props = defineProps<{
  class?: ClassProp;
  style?: StyleValue;
  modelValue: NotificationType;
}>();

const attrs = useAttrs();
</script>
<style lang=""></style>
