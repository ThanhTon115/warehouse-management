<template>
  <q-header
    :class="['customized-header bg-transparent ', props.class]"
    :style="props.style"
  >
    <div
      :class="`w-full h-full ${isScrolled ? 'backdrop-blur-sm shadow-sm' : ''} absolute rounded-full`"
    ></div>
    <q-toolbar class="flex justify-between">
      <div class="flex items-center">
        <XBtn
          v-show="$q.screen.lt.md"
          dense
          rounded
          unelevated
          :icon="globalStore.leftDrawerVisible ? ICON_BACK : ICON_FORWARD"
          @click="handleChangeVisible"
        ></XBtn>
        <q-breadcrumbs separator=">" class="text-primary-bold q-ml-md">
          <template #separator>
            <QIcon :name="ICON_FORWARD" size="1.5rem" color="grey-7" />
          </template>
          <q-breadcrumbs-el
            v-for="(item, index) in breadcrumbs"
            :key="index"
            :class="`text-capitalize ${
              index === breadcrumbs.length - 1
                ? 'text-primary text-weight-bold'
                : 'text-grey-7'
            }`"
            :label="item.label"
            :to="index === breadcrumbs.length - 1 ? null : item"
          ></q-breadcrumbs-el>
        </q-breadcrumbs>
      </div>
      <ThemeToggle />
      <div class="flex items-center justify-between gap-4">
        <NotificationButton />
        <UserMenu />
      </div>
    </q-toolbar>
  </q-header>
</template>
<script lang="ts" setup>
import { useQuasar } from "quasar";
import useGlobalStore from "src/stores/useGlobalStore";
import {
  computed,
  Fragment,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  StyleValue,
} from "vue";
import { ClassProp, ICON_FORWARD, ICON_BACK } from "src/shared/themes/types";
import { findBreadcrumbs } from "src/router/routes";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import "./styles.scss";
import XBtn from "src/components/core/button/XBtn.vue";
import ThemeToggle from "./header/ThemeToggle.vue";
import UserMenu from "./UserMenu.vue";
import NotificationButton from "src/modules/notification/component/NotificationButton.vue";

const props = defineProps<{ class?: ClassProp; style?: StyleValue }>();

const globalStore = useGlobalStore();
const $q = useQuasar();
const i18n = useI18n();
const route = useRoute();
const isScrolled = ref(window.scrollY > 16);

const handleScroll = () => {
  if (window.scrollY > 16 && !isScrolled.value) {
    isScrolled.value = true;
    return;
  }
  if (window.scrollY <= 16 && isScrolled.value) {
    isScrolled.value = false;
  }
};

const breadcrumbs = computed(() =>
  findBreadcrumbs(route).map((r) => ({
    ...(r as Record<string, unknown>),
    label: r.name ? i18n.t(`route.${r.name.toString()}`) : "",
    name: r?.name,
  })),
);

const handleChangeVisible = () => {
  globalStore.leftDrawerVisible = !globalStore.leftDrawerVisible;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
