<template>
  <q-item
    clickable
    :to="{ name: props.item?.pathName }"
    :active="
      props.item?.pathName === route.name ||
      route.path?.includes(props.item?.pathName)
    "
    :active-class="false ? 'sidebar-mini-active' : 'sidebar-active'"
    class="flex items-center gap-4 sidebar-item"
  >
    <q-icon
      size="24px"
      v-if="!!props.item?.icon"
      :name="`${props.item.icon}${
        props.item?.pathName === route.name ||
        route.path.includes(props.item?.pathName)
          ? ''
          : ''
      }`"
    >
      <q-tooltip>{{ props.item?.title }}</q-tooltip></q-icon
    >
    <span class="text-bold capitalize q-py-sm sidebar-item-title">
      {{ props.item?.title }}
    </span>
  </q-item>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
<style lang=""></style>
