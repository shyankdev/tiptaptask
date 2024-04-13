<template>
  <div class="flex justify-between rounded-lg h-24">
    <span class="text-white">font weight slider</span>
    <span grow>
      <VueSlider v-model="editModel.sliderValue" />
      <p class="text-white">Value: {{ editModel.sliderValue }}</p>
    </span>
    <button @click="exportTextHadler" class="text-white">export with get text</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from "vue";
import VueSlider from "vue-3-slider-component";
import type EditorModel from "../Models/EditorModel";

const props = defineProps(["editModel"])

const editModel : EditorModel = props.editModel


const exportTextHadler = () => {
  editModel.exportGetTextSignal = !editModel.exportGetTextSignal
}

</script>
