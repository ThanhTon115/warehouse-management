<template>
  <q-btn
    v-bind="{ ...props, ...customizedAttrs }"
    :data-theme="dataTheme"
    :loading="props.loading"
  >
    <slot></slot>
  </q-btn>
</template>
<script setup lang="ts">
import { QBtn } from "quasar";
import useGlobalStore from "src/stores/useGlobalStore";
import { computed, useAttrs } from "vue";
export type XBtnProps = InstanceType<typeof QBtn>["$props"];

const props = defineProps({
  ...QBtn.props,
  color: String,
});
const emit = defineEmits();
const attrs = useAttrs();
const { theme } = useGlobalStore();
const customizedAttrs = computed(() => ({
  ...attrs,
  ...(theme.dark ? { "data-theme": "dark" } : {}),
}));
const dataTheme = computed(() => (theme.dark ? "dark" : null));
</script>
<style lang="scss">
.q-btn {
  background-color: var(--btn-bg-color) !important;
  color: var(--btn-text-color) !important;
  border-radius: 20px;
  &__content {
    line-height: normal;
  }
  &:hover {
    background-color: var(--btn-bg-color-hover) !important;
  }
}
</style>
