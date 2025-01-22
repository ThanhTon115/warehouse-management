<template>
  <div
    :class="`max-lg:w-full max-lg:h-[100dvh] max-lg:bg-[#0006] drawer--${globalStore.leftDrawerVisible ? 'shown' : 'hidden'}`"
    @click.self="handleClose"
  >
    <div
      :class="`q-drawer max-lg:!bg-[#fff6] customized-drawer${globalStore.leftDrawerMini && !$q.screen.lt.md ? '--mini' : ''}`"
    >
      <div
        :class="[
          globalStore.leftDrawerMini
            ? 'sidebar-logo--mini q-pa-md'
            : 'sidebar-logo q-px-md q-py-lg',
        ]"
      >
        <RouterLink to="/">
          <img
            :style="{
              maxWidth: '100%',
              maxHeight: '96px',
              borderRadius: '15%',
            }"
            alt="logo"
            :src="logo"
            fit="contain"
            class="m-auto"
          />
        </RouterLink>
      </div>
      <XBtn
        dense
        rounded
        unelevated
        :icon="globalStore.leftDrawerMini ? ICON_FORWARD : ICON_BACK"
        @click="handleMini"
        class="ml-[50%] translate-x-[-50%] bg-white my-5 max-lg:hidden"
      ></XBtn>
      <q-list
        :class="`${globalStore.leftDrawerMini ? '' : 'q-mx-ms'} customized-list mt-8`"
      >
        <div v-for="(item, rootIndex) in navItems" style="margin-top: 12px">
          <QExpansionItem
            :class="`rounded-[28px] expansion-item${
              !!item.subMenus &&
              item.subMenus.some(
                (sm: any) =>
                  sm.pathName &&
                  route?.name &&
                  route.name.toString().includes(sm.pathName),
              )
                ? '--active'
                : ''
            }`"
            v-if="!!item.subMenus && item.subMenus?.length > 0"
            :contentInsetLevel="0.5"
            :key="`nav-subs-${item.key}-${rootIndex}`"
            :expandIcon="ICON_DOWN"
            :expandedIcon="ICON_UP"
            :hide-expand-icon="globalStore.leftDrawerMini"
            :modelValue="
              item.pathName === route.name ||
              (!!item.subMenus &&
                item.subMenus.some(
                  (sm: any) =>
                    sm.pathName &&
                    route?.name &&
                    route.name.toString().includes(sm.pathName),
                ))
            "
          >
            <template #header>
              <MiniMenuItem :icon-color="props.iconColor" :item="item" />
            </template>
            <q-list v-if="!globalStore.leftDrawerMini">
              <SideBarItem
                class="sub-menu-item"
                v-for="(subMenu, index) in item.subMenus"
                :key="`${subMenu.key}-${rootIndex}-${index}`"
                :item="subMenu"
              ></SideBarItem>
            </q-list>
          </QExpansionItem>
          <SideBarItem
            :item="item"
            :key="`nav-${item.key}-${rootIndex}`"
            v-else
          />
        </div>
      </q-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import { capitalize, computed, watch } from "vue";
import SideBarItem from "./SideBarItem.vue";
import { QExpansionItem, useQuasar } from "quasar";
import useGlobalStore from "src/stores/useGlobalStore";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import {
  ICON_UP,
  ICON_DOWN,
  ICON_FORWARD,
  ICON_BACK,
} from "src/shared/themes/types";
import MiniMenuItem from "./MiniMenuItem.vue";
import routes from "src/router/routes";
import { NavigationItem } from "src/router/types";
import { UserRole } from "src/shared/types";
import XBtn from "src/components/core/button/XBtn.vue";
import "./styles.scss";

const $q = useQuasar();
const globalStore = useGlobalStore();
const route = useRoute();
const i18n = useI18n();

const props = defineProps({
  iconColor: {
    type: String,
    default: "#8D8D94",
  },
});
const logo = computed(() => globalStore.theme.logo.default);
const handleMini = () => {
  globalStore.setLeftDrawerMini(!globalStore.leftDrawerMini);
};
const checkItemPermission = (nav: NavigationItem) => {
  // const currentRole = globalStore.account?.roles[0];
  const currentRole = UserRole.Admin;
  return (
    !nav.permissions ||
    nav.permissions?.length === 0 ||
    nav.permissions?.includes(currentRole)
  );
  // !nav.permissions?.length || globalStore.hasPermissions(nav.permissions)
};
const transformNav = (
  nav: NavigationItem,
): NavigationItem & { hasChildren: boolean } => ({
  ...nav,
  key: nav.title,
  title: capitalize(i18n.t(nav.title)),
  // priority: mapPriotity(nav.moduleId),
  subMenus: (nav.subMenus || []).filter(checkItemPermission).map(transformNav),
  hasChildren: !!nav.subMenus && nav.subMenus?.length > 0,
});
const navItems = computed(() => {
  let _routes = routes;
  switch (process.env.NAME) {
    default:
      break;
  }
  return _routes.navigation
    .map(transformNav)
    .filter(
      (m) =>
        checkItemPermission(m) &&
        (!(m as any).hasChildren || (!!m.subMenus && m.subMenus?.length > 0)),
    );
});
const handleClose = (env: MouseEvent) => {
  if ($q.screen.lt.md && globalStore.leftDrawerVisible) {
    globalStore.leftDrawerVisible = false;
  }
};
watch(
  () => [$q.screen.sm, $q.screen.md],
  (newVal, oldVal) => {
    if (newVal[0] && oldVal[1] && globalStore.leftDrawerVisible) {
      globalStore.leftDrawerVisible = false;
      return;
    }
    if (newVal[1] && oldVal[0] && !globalStore.leftDrawerVisible) {
      globalStore.leftDrawerVisible = true;
    }
  },
);
watch(
  () => $q.screen.gt.md,
  (newVal, oldVal) => {
    if (!globalStore.leftDrawerVisible && newVal && !oldVal) {
      globalStore.leftDrawerVisible = true;
    }
  },
);
</script>
