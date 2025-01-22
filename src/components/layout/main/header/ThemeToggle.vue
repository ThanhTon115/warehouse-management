<template>
  <div
    :class="`rounded-full flex justify-between p-[4px] relative w-[60px] overflow-hidden`"
  >
    <img
      width="16px"
      height="16px"
      :src="ICON_SUN"
      :class="`${themeType === 'dark' ? 'slide-down' : 'slide-up'}`"
      @click="handleChangeTheme"
    />
    <img
      width="16px"
      height="16px"
      :src="ICON_MOON"
      :class="`${themeType === 'light' ? 'slide-down' : 'slide-up'}`"
      @click="handleChangeTheme"
    />
    <div
      :class="`highlighted-bg absolute top-0 left-0 highlighted-bg--${themeType}`"
    ></div>
    <!-- <div
      :class="`highlighted-bg highlighted-bg--st absolute top-0 left-0 highlighted-bg--${themeType} shadow-lg`"
    ></div>
    <div
      :class="`highlighted-bg highlighted-bg--nd absolute top-0 left-0 highlighted-bg--${themeType} shadow-lg`"
    ></div> -->
    <!-- <div :class="`bg-cloud bg-cloud--${themeType}`"></div>
    <div :class="`bg-stars bg-stars--${themeType}`"></div> -->
  </div>
</template>
<script setup lang="ts">
import { ICON_MOON, ICON_SUN } from "src/shared/themes/types";
import useGlobalStore from "src/stores/useGlobalStore";
import { computed } from "vue";

const globalStore = useGlobalStore();
const themeType = computed(() => (globalStore.theme.dark ? "dark" : "light"));
const handleChangeTheme = () => {
  globalStore.changeTheme();
};
</script>
<style lang="scss" scoped>
.highlighted-bg {
  width: 96px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: white;
  margin: 4px;
  z-index: 2;
  &--st {
    height: 36px;
    width: 36px;
    top: -6px;
    left: -4px;
    background-color: #fff7;
    &.highlighted-bg--dark {
      left: -8px !important;
    }
  }
  &--nd {
    height: 48px;
    width: 48px;
    top: -12px;
    left: -8px;
    background-color: #fff2;
    &.highlighted-bg--dark {
      left: -16px !important;
    }
  }
  &--light {
    transform: translateX(0px);
    transition: all 0.3s;
  }
  &--dark {
    transform: translateX(28px) !important;
    transition: all 0.3s;
  }
}
img {
  margin: 4px;
  z-index: 10;
  cursor: pointer;
}
.slide-down {
  transition: all 0.3s;
}
.slide-up {
  transition: all 0.3s;
}
.bg-day {
  background: linear-gradient(
    180deg,
    rgba(168, 221, 240, 1) 0%,
    rgb(227 242 255) 100%
  );
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
}
.bg-night {
  background: linear-gradient(
    180deg,
    rgba(20, 20, 20, 1) 0%,
    rgba(6, 37, 80, 1) 100%
  );
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
}
.bg-cloud {
  height: 24px;
  width: 90%;
  bottom: 0;
  right: 0;
  margin-bottom: -2px;
  margin-right: -4px;
  position: absolute;
  background: round;
  background-image: url("/img/cloud.svg");
  &--light {
    transform: scale(1);
    transition: all 0.3s;
  }
  &--dark {
    transform: scale(0);
    transition: all 0.3s;
  }
}
.bg-stars {
  height: 100%;
  width: 90%;
  margin-top: -4px;
  position: absolute;
  background: round;
  background-image: url("/img/star-sky.svg");
  &--light {
    transform: scale(0);
    transition: all 0.3s;
  }
  &--dark {
    transform: scale(1);
    transition: all 0.3s;
  }
}
</style>
