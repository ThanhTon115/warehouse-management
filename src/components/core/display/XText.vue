<template>
  <div v-bind="customizedAttrs">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ClassProp } from "src/shared/themes/types";
import useGlobalStore from "src/stores/useGlobalStore";
import { computed, StyleValue, useAttrs } from "vue";

const props = defineProps<{
  class?: ClassProp;
  style?: StyleValue;
  bold?: boolean;
}>();
const attrs = useAttrs();
const { theme } = useGlobalStore();
const customizedAttrs = computed(() => ({
  ...attrs,
  ...props,
  ...(theme.dark ? { "data-theme": "dark" } : {}),
}));
</script>
<style></style>
