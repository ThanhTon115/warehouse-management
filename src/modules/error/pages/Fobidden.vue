<template>
  <div class="flex flex-row w-[100vw] h-[100vh] items-center justify-center bg-black">
    <img :src="ForbiddenImage" class="w-[50%] h-[50%] min-w-[350px]" />
  </div>
</template>
<script setup lang="ts">
import { ForbiddenImage } from 'src/shared/themes/types'
</script>
<style lang=""></style>
