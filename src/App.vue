<template>
  <main class="h-screen w-screen bg-gray-900">
    <HeadComponent/>

    <div class="p-4 m-4 rounded-lg bg-white">
      <TipTap/>
    </div>
  
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
