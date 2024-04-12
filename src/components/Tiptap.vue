<script setup lang="ts">

import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { onBeforeUnmount, onMounted, ref, type Ref , h, defineComponent} from 'vue'

const editor = useEditor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
      ],
    })

</script>

<template>
  <h1>this is tip tap editpr</h1>
  
  <editor-content :editor="editor" />
</template>