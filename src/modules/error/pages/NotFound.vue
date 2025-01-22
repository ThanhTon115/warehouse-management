<template>
  <div
    class="flex flex-col w-[100vw] h-[100vh] items-center justify-center bg-black"
  >
    <img :src="NotFoundImage" class="w-[80%] min-w-[350px] max-w-[599px]" />
    <XBtn class="primary-btn--large mt-4" @click.prevent="handleClick"
      >{{ i18n.t("label.back_to_home") }}
    </XBtn>
  </div>
</template>
<script setup lang="ts">
import XBtn from "src/components/core/button/XBtn.vue";
import { ROUTE_HOMEPAGE } from "src/router/routes";
import { NotFoundImage } from "src/shared/themes/types";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const i18n = useI18n();
const router = useRouter();
const handleClick = () => router.replace(ROUTE_HOMEPAGE);
</script>
<style lang=""></style>
