<template>
  <main class="h-screen w-screen bg-gray-900">
    <HeadComponent/>
    <SelectionEditor :editModel="editModel"/>
    <div class="p-4 m-4 rounded-lg bg-white">
      <TipTap/>
    </div>

    
  
  </main>
</template>

<script setup lang="ts">
// TypeScript enabled
import { ref, watch, type Ref } from "vue";
import TipTap from "./components/Tiptap.vue";

import HeadComponent from "./components/HeadComponent.vue";
import SelectionEditor from "./components/SelectionEditor.vue";

const createEditorModel = (): EditorModel => ({
  selectedNode: undefined,
  sliderValue: 0,
});

const editModel : Ref<EditorModel> = ref(createEditorModel())

watch(editModel.value , (newVal) => {
  console.log("updated slider vlaue is " + newVal.sliderValue)
})

</script>
