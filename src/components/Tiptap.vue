<script setup lang="ts">
import { Editor, EditorContent, useEditor } from "@tiptap/vue-3";
// import {TextSelection} from '@tiptap/vue-3'
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import Focus from "@tiptap/extension-focus";
// import { run } from "node:test";
import { watch } from "vue";
import { RefSymbol } from "@vue/reactivity";
import type EditorModel from "../Models/EditorModel";
import { TextSelection } from "@tiptap/pm/state";

const props = defineProps(["editModel"]);

const editModel: EditorModel = props.editModel;
console.log("edit mode  in tiptap class is ");
console.log(editModel);

// const aka = new Editor({})
// const editor = useEditor({
const editor = new Editor({
  content: "",
  extensions: [
    StarterKit,
    PlaceHolder.configure({
      emptyEditorClass: "is-editor-empty",
      placeholder: "write here",
    }),
    Focus.configure({
      // className: 'has-focus',
      mode: "deepest",
      // mode: 'all',
    }),
  ],
  onBeforeCreate({ editor }) {
    // Before the view is created.
    // console.log("on before create editor")
  },
  onCreate({ editor }) {
    // The editor is ready.
    // console.log("on create edotpr")
  },
  onUpdate({ editor }) {
    // The content has changed.
    // console.log("on update editor")
  },
  onSelectionUpdate({ editor }) {
    console.log("on selection update editor");
    // console.log(editor.chain().focus())
    if (editor.isEmpty) {
      editModel.selectedNode = undefined;
      return;
    }

    const selectedItem = editor.view.state.selection

    // const selectedItem: Object = editor.chain().focus();
    // editor.chain().focus().setBold().run()
    // selectedItem.toggleBold().run()

    // const count = selectedItem.toString.length;

    // console.log("selection item has a lenght of " + count);
    console.log("slected item is " + selectedItem.content.toString)
    editModel.selectedNode = selectedItem;

    // editModel.sliderValue = 0
    // The selection has changed.
  },
  onTransaction({ editor, transaction }) {
    // console.log("on transaction editor")
    // The editor state has changed.
  },
  onFocus({ editor, event }) {
    // console.log("on focus editor")
    // The editor is focused.
  },
  onBlur({ editor, event }) {
    // console.log("on blur editor")
    // The editor isn’t focused anymore.
  },
  onDestroy() {
    // console.log("on destroy editor")
    // The editor is being destroyed.
  },
});

watch(editModel, (newValue) => {
  // const { selection, state } = editor

  if (newValue.sliderValue > 50) {
    console.log("slider is above 50");
    // editor.chain().focus().setBold().run()
    // editor.chain().focus().setBold().run()

    editor.commands.setBold();
  } else {
    console.log("slider is below 50");
    // editor.chain().focus().unsetBold().run()
    editor.commands.unsetBold();
  }
});
</script>

<template>
  <editor-content :editor="editor" />
</template>
