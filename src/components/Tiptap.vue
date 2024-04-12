<script setup lang="ts">

import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import PlaceHolder from '@tiptap/extension-placeholder'
import { onBeforeUnmount, onMounted, ref, type Ref , h, defineComponent} from 'vue'

const editor = useEditor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
        PlaceHolder.configure({
          emptyEditorClass: 'is-editor-empty',
          placeholder: "write here"
        })
      ],
    })

</script>

<template>
  <editor-content :editor="editor" />
</template>

