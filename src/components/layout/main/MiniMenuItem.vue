<template>
  <div class="gap-4 flex items-center">
    <q-icon
      size="24px"
      @mouseover="onMouseMove"
      @mouseleave="onMouseleave"
      :name="`${props.item?.icon}${
        props.item?.pathName === route.name
          ? // item.subMenus.some(
            //   (sm) =>
            //     sm.pathName &&
            //     route.name.toString().includes(sm.pathName)
            // )
            ''
          : ''
      }`"
      :style="{ color: props.iconColor }"
      ><q-tooltip>{{ props.item?.title }}</q-tooltip></q-icon
    >
    <span class="text-bold capitalize q-py-sm sidebar-item-title">
      {{ props.item?.title }}
    </span>
  </div>
  <q-menu
    v-if="globalStore.leftDrawerMini"
    @mouseover="onMouseMove"
    @mouseleave="onMouseleave"
    anchor="top right"
    self="top left"
    v-model="visibleSubMenu"
    :ref="(el: any) => (menuRef = el)"
    class="sub-menus p-2"
  >
    <SideBarItem
      v-for="(item, index) in props.item?.subMenus"
      :item="item"
      :key="`popup-${item.key}-${index}`"
    ></SideBarItem>
  </q-menu>
</template>
<script setup lang="ts">
import { QMenu, debounce } from "quasar";
import { NavigationItem } from "src/router/types";
import useGlobalStore from "src/stores/useGlobalStore";
import { Fragment, PropType, ref } from "vue";
import { useRoute } from "vue-router";
import SideBarItem from "./SideBarItem.vue";

const props = defineProps({
  item: Object as PropType<NavigationItem>,
  iconColor: String,
});

const visibleSubMenu = ref(false);
const menuRef = ref<QMenu | null>(null);
const route = useRoute();
const globalStore = useGlobalStore();
const debounceHideMenu = debounce(() => {
  visibleSubMenu.value = false;
}, 0);
const onMouseMove = () => {
  visibleSubMenu.value = true;
};
const onMouseleave = () => {
  debounceHideMenu();
};
</script>
<style></style>
