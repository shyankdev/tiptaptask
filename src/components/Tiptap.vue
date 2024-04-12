<script setup lang="ts">
import { Editor, EditorContent, useEditor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import {
  onBeforeUnmount,
  onMounted,
  ref,
  type Ref,
  h,
  defineComponent,
} from "vue";


const editor = useEditor({
  content: "",
  extensions: [
    StarterKit,
    PlaceHolder.configure({
      emptyEditorClass: "is-editor-empty",
      placeholder: "write here",
    }),
  ],
  onBeforeCreate({ editor }) {
    // Before the view is created.
    console.log("on before create editor")
  },
  onCreate({ editor }) {
    // The editor is ready.
    console.log("on create edotpr")
  },
  onUpdate({ editor }) {
    // The content has changed.
    console.log("on update editor")
  },
  onSelectionUpdate({ editor }) {
    console.log("on selection update editor")
    // The selection has changed.
  },
  onTransaction({ editor, transaction }) {
    console.log("on transaction editor")
    // The editor state has changed.
  },
  onFocus({ editor, event }) {
    console.log("on focus editor")
    // The editor is focused.
  },
  onBlur({ editor, event }) {
    console.log("on blur editor")
    // The editor isn’t focused anymore.
  },
  onDestroy() {
    console.log("on destroy editor")
    // The editor is being destroyed.
  },
});
</script>

<template>
  <editor-content :editor="editor" />
</template>
