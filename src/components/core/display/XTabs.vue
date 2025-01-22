<template>
  <div class="overflow-hidden">
    <q-tabs
      v-bind="{ ...props, ...customizedAttrs }"
      :model-value="currentTab"
      :class="`customized-tabs ${props.class ?? ''}`"
      :data-theme="dataTheme"
    >
      <q-tab
        v-for="tab in props.tabs"
        :key="tab.name"
        :name="tab.name"
        @click="() => (currentTab = tab.name)"
      >
        <span
          v-if="!slots.label"
          :class="`${currentTab !== tab.name ? 'text-primary' : ''}`"
          >{{ tab.label }}</span
        >
        <slot v-else name="label" :item="tab"></slot>
      </q-tab>
    </q-tabs>
    <div class="customized-tab-panel__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { QTabs } from "quasar";
import useGlobalStore from "src/stores/useGlobalStore";
import { computed, PropType, ref, useAttrs, useSlots, watch } from "vue";

const props = defineProps({
  ...QTabs.props,
  tabs: Array as PropType<{ label: string; name: string; icon?: string }[]>,
  defaultTab: String,
  max: Number,
});
const { theme } = useGlobalStore();
const attrs = useAttrs();
const customizedAttrs = computed(() => ({
  ...attrs,
  ...(theme.dark ? { "data-theme": "dark" } : {}),
}));

const slots = useSlots();

const dataTheme = computed(() => (theme.dark ? "dark" : null));
const currentTab = ref<string>("all");
const activeTab = ref();
</script>
<style lang="scss">
.customized-tabs {
  /* For Firefox */
  scrollbar-width: none; /* Hides scrollbar */
  -ms-overflow-style: none; /* For Internet Explorer 10+ */
  /* For WebKit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    display: none; /* Hides scrollbar */
  }
  overflow-x: auto;
  .q-tabs__content {
    overflow: visible;
  }
  .q-tab {
    flex-grow: 0;
    padding-inline: 8px;
    border-radius: 24px 24px 0 0;

    .q-focus-helper {
      margin-bottom: -24px;
      bottom: 0;
      top: auto;
      transition: all 0.3s;
    }
    &__content {
      color: black !important;
      font-weight: bolder;
      align-self: flex-start;
      padding-top: 8px;
    }
    &__indicator {
      display: none;
    }
    &--inactive {
      background-color: transparent;
      transition: all 0.3s;
      span {
        color: var(--text-primary);
      }
      &::before {
        content: "";
      }
      &::after {
        content: "";
      }
      &:hover {
        .q-focus-helper {
          height: calc(100% + 24px);
        }
      }
    }
    &--active {
      border-radius: 24px 24px 0 0;
      transition: all 0.3s;
      z-index: 2;
      .q-ripple {
        display: none;
      }
      .q-tab__content {
        color: black !important;
      }
      .q-focus-helper {
        margin-bottom: -24px;
        bottom: 0;
        top: auto;
        background: white !important;
        opacity: 1 !important;
        height: calc(100% + 24px);
        transition: all 0.3s;
        &::after,
        &::before {
          display: none;
        }
      }
      &::before {
        content: "";
        background: transparent;
        height: 36px;
        width: 24px;
        position: absolute;
        bottom: 0;
        right: -24px;
        border-radius: 0 0 0 18px;
        box-shadow: 0 18px 0 0 #ffffff;
        transition: all 0.3s;
      }
      &::after {
        content: "";
        background: transparent;
        height: 36px;
        width: 24px;
        position: absolute;
        bottom: 0;
        left: -24px;
        border-radius: 0 0 18px 0;
        box-shadow: 0 18px 0 0 #ffffff;
        transition: all 0.3s;
      }
    }
  }
}
.customized-tab-panel__content {
  background-color: #ffffff;
  border-radius: 0 0 24px 24px;
  position: relative;
  z-index: 3;
}
</style>
