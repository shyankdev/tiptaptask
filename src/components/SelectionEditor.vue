<template>
  <div class="flex justify-between rounded-lg p-4 m-4">
    <span class="text-white">font weight slider</span>

    <!-- <h1 class="text-white">export </h1> -->
    <span grow>
      <VueSlider v-model="value" />
      <p class="text-white">Value: {{ value }}</p>
    </span>

    <button class="text-white">export with get text</button>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import VueSlider from "vue-3-slider-component";

const value: Ref<Number> = ref(0);
</script>
