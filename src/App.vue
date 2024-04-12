<template>
  <main class="h-screen w-screen bg-gray-900">
    <HeadComponent/>
  <TipTap/>
  </main>
</template>

<script setup lang="ts">
// TypeScript enabled
import { ref, type Ref } from "vue";
import TipTap from "./components/Tiptap.vue";

import HeadComponent from "./components/HeadComponent.vue";

// const header = HeadComponent
// export default {
//   components: {
//     HeadComponent,
//   },
// };
// const count: Ref<number> = ref(1);
</script>
