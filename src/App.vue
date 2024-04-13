<template>
  <main class="h-screen w-screen bg-gray-900">
    <HeadComponent />
    <div class="h-12">

    </div>
    <div v-if="isObjectSelected" >
      <SelectionEditor :editModel="editModel"/>
    </div>
    <div v-else class="h-24">

    </div>
 
    <!-- <SelectionEditor :editModel="editModel"/> -->

    <!-- (editModel.value.selectedNode == ) -->
    <div class="p-4 m-4 rounded-lg bg-white">
      <TipTap :editModel="editModel"/>
    </div>

    
  
  </main>
</template>

<script setup lang="ts">
// TypeScript enabled
import { ref, watch, type Ref , computed } from "vue";
import TipTap from "./components/Tiptap.vue";

import HeadComponent from "./components/HeadComponent.vue";
import SelectionEditor from "./components/SelectionEditor.vue";
// import { nodes } from "@tiptap/pm/schema-basic";
// import EditorModel from './Models/EditorModel'

const createEditorModel = (): EditorModel => ({
  selectedNode: undefined,
  sliderValue: 0,
  exportGetTextSignal : false,
});

import type EditorModel from "./Models/EditorModel";

const editModel : Ref<EditorModel> = ref(createEditorModel())
// const isObjectSelected : Ref<boolean> = ref(false)

  const isObjectSelected = computed(() => {
  return typeof editModel.value.selectedNode === 'object' && editModel.value.selectedNode !== null;
});

// watch(editModel.value , (newVal) => {
//   console.log("updated slider vlaue is " + newVal.sliderValue)
// })



</script>
