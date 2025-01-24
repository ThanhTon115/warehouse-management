<template>
  <div class="text-primary">
    <q-icon
      :name="ICON_LANGUAGE"
      color="primary"
      size="20px"
      class="cursor-pointer rounded-full"
    >
      <q-menu auto-close self="top end" class="language-select-menu">
        <q-list>
          <q-item
            v-for="item in languages"
            clickable
            v-close-popup
            :class="`hover:bg-slate-300/50`"
            @click="() => changeLocale(item)"
            :active="globalStore.currentLocale === item"
          >
            <q-item-section class="text-primary">{{
              t(`label.language.${item}`)
            }}</q-item-section>
            <q-item-section side>
              <q-badge
                v-if="globalStore.currentLocale === item"
                color="red"
                rounded
                style="height: 8px"
              />
            </q-item-section>
          </q-item>
        </q-list> </q-menu
    ></q-icon>
    {{ globalStore.currentLocale }}
  </div>
</template>
<script setup lang="ts">
import { ICON_LANGUAGE } from "src/shared/themes/types";
import useGlobalStore from "src/stores/useGlobalStore";
import { useI18n } from "vue-i18n";
import { setAppLocale } from "src/shared/storage";

const { t, locale } = useI18n();
const globalStore = useGlobalStore();
const languages = ["vi", "en"];
const changeLocale = (newLocale: string) => {
  globalStore.setLocale(newLocale);
  locale.value = newLocale;
};
</script>
<style lang="scss">
.language-select-menu {
  .q-badge {
    min-height: 8px;
    min-width: 8px;
    padding: 0;
  }
}
</style>
