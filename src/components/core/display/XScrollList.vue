<template>
  <div
    :class="`customized-scroll-list ${props.class ?? ''}`"
    :ref="setRef"
    @scroll="onScroll"
  >
    <slot
      :customizedStyles="customizedStyles"
      itemClass="scroll-list-item"
    ></slot>
  </div>
</template>
<script setup lang="ts">
import { throttle } from "quasar";
import { ClassProp } from "src/shared/themes/types";
import { computed, onMounted, reactive, ref, StyleValue, watch } from "vue";

const props = defineProps<{
  class?: ClassProp;
  style?: StyleValue;
  itemRefs?: Array<any>;
}>();
const refVal = ref();
const customizedStyles = reactive<any[]>([]);
const setRef = (val: any) => {
  if (!refVal.value) {
    refVal.value = val;
  }
};
const calcStyle = (item: any) => {
  const itemHeight = item.clientHeight;
  const breakpointValue = {
    top:
      refVal.value.scrollTop > 0
        ? item.offsetTop - itemHeight / 4 - refVal.value.scrollTop
        : 0,
    bottom:
      refVal.value.scrollTop +
      refVal.value.clientHeight -
      item.offsetTop -
      itemHeight,
  };
  const scaleValue =
    breakpointValue.top < 0
      ? Math.abs(breakpointValue.top) < itemHeight
        ? (itemHeight - Math.abs(breakpointValue.top)) / itemHeight
        : 0
      : breakpointValue.bottom < 0
        ? Math.abs(breakpointValue.bottom) < itemHeight
          ? (itemHeight - Math.abs(breakpointValue.bottom)) / itemHeight
          : 0
        : 1;
  return {
    transform: `scale3d(${scaleValue}, ${scaleValue}, 1) translateY(${breakpointValue.bottom < 0 ? "-" : ""}${16 * (scaleValue < 1 ? scaleValue : 0)}px)`,
    opacity: `${scaleValue}`,
  };
};
const onScroll = throttle(() => {
  if (refVal.value) {
    Object.values(refVal.value?.children)?.forEach(
      (item: any, index: number) => {
        if (item) {
          customizedStyles[index] = {
            ...calcStyle(item),
            ...(index === Object.values(refVal.value?.children)?.length - 1
              ? { marginBottom: `${item.clientHeight / 4}px` }
              : {}),
          };
        }
      },
    );
  }
}, 0);
onMounted(() => {
  void onScroll();
});
</script>
<style lang="scss">
@keyframes scroll-item {
  0% {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5);
  }
  50% {
    opacity: 0;
    transform: scale3d(0.75, 0.75, 0.75);
  }
  100% {
    opacity: 0;
    transform: scale3d(0.5, 0.5, 0.5);
  }
}
.customized-scroll-list {
  /* For Firefox */
  scrollbar-width: none; /* Hides scrollbar */
  -ms-overflow-style: none; /* For Internet Explorer 10+ */
  /* For WebKit (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    display: none; /* Hides scrollbar */
  }
  .scroll-list-item {
    animation: scroll-item linear;
    animation-timeline: view();
    animation-range: entry 0% cover 5%;
  }
}
</style>
