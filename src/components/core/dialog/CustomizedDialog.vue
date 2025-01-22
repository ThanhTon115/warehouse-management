<template>
  <q-dialog v-bind="{ ...props, ...customizedAttrs }" :data-theme="dataTheme">
    <slot></slot>
  </q-dialog>
</template>
<script setup lang="ts">
import { QDialog } from "quasar";
import { ClassProp } from "src/shared/themes/types";
import useGlobalStore from "src/stores/useGlobalStore";
import { computed, StyleValue, useAttrs } from "vue";

export type XDialogProps = InstanceType<typeof QDialog>["$props"] & {
  title?: string;
  titleClass?: ClassProp;
  titleStyle?: StyleValue;
  contentClass?: ClassProp;
  contentStyle?: StyleValue;
  closeIcon?: string;
  closeIconSize?: string;
  classRow?: string;
  closeIconColor?: string;
};

const props = defineProps({
  ...QDialog.props,
  contentClass: [String, Object, Array],
  contentStyle: [String, Object, Array],
  classRow: String,
  title: String,
  titleClass: [String, Object, Array],
  titleStyle: [String, Object, Array],
  closeIcon: {
    type: String,
    default: "close",
  },
  closeIconSize: {
    type: String,
    default: "1.5rem",
  },
  closeIconColor: {
    type: String,
    default: "primary-500",
  },
});
const attrs = useAttrs();
const { theme } = useGlobalStore();
const customizedAttrs = computed(() => ({
  ...attrs,
  ...(theme.dark ? { "data-theme": "dark" } : {}),
}));
const dataTheme = computed(() => (theme.dark ? "dark" : null));
</script>
<style lang=""></style>
