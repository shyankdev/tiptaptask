<script setup lang="ts">
import { Editor, EditorContent, Node } from "@tiptap/vue-3";
// import {TextSelection} from '@tiptap/vue-3'
import { ref } from "vue";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import Focus from "@tiptap/extension-focus";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
// import { run } from "node:test";
import { watch } from "vue";
import { RefSymbol } from "@vue/reactivity";
import type EditorModel from "../Models/EditorModel";
import { TextSelection } from "@tiptap/pm/state";
import { FontSize, FontWeight } from "../FontWeightExtension";
import { Mark } from "@tiptap/pm/model";
// import { FontWeight} from "../FontWeightExtension"

const props = defineProps(["editModel"]);

const editModel: EditorModel = props.editModel;
console.log("edit mode  in tiptap class is ");
console.log(editModel);

let selectedNode: Node<any, any> | undefined = undefined;

const fromLoc = ref(0);
const toLoc = ref(0);
// const aka = new Editor({})
// const editor = useEditor({

const CustomNode = Node.create({
  name: "customNode",

  group: "inline",

  inline: true,

  // Your code goes here.
});

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
    FontFamily.configure({
      types: ["textStyle"],
    }),
    TextStyle,
    FontSize,
    FontWeight,
    CustomNode,
  ],

  onSelectionUpdate({ editor }) {
    console.log("on selection update editor");
    // console.log(editor.chain().focus())
    // if (editor.isEmpty) {
    //   editModel.selectedNode = undefined;
    //   return;
    // }
    const selec = editor.view.state.selection;
    fromLoc.value = selec.from;
    toLoc.value = selec.to;

    if (fromLoc.value == toLoc.value) {
      editModel.selectedNode = undefined;
      return;
    }

    const selectedItem: Object = editor.chain().focus();

    const newNode = Node.create({
      from: fromLoc.value,
      to: toLoc.value,
    });
    selectedNode = newNode;
    console.log("newly created node is ");
    console.log(newNode);

    editModel.selectedNode = selectedItem;

    console.log("hall selected length is ");
    console.log(selec.toJSON());

    console.log("locaton for selection are ");
    console.log(fromLoc.value);
    console.log(toLoc.value);
  },
});

watch(
  () => editModel.exportGetTextSignal,
  (newVal, oldVal) => {
    const txt = editor.getText();
    const html = editor.getHTML();

    // const attribute = editor.getAttributes("span")
    console.log("exported text is " + txt)
    console.log("exported htnl is " + html)
    // console.log("exported attr is ")
    // console.log(attribute)

    let doc = editor.view.state.doc;
    const marksSet = new Set();

    doc.descendants((node) => {
      if (node.isText) {
      node.marks.forEach((mark) => {
        // marksSet.add(mark.type); // Add the mark type to the Set
        console.log("mark found")
        console.log(node.type.name)
        console.log(mark.toJSON())
        console.log(mark.attrs)
        console.log(node.text)
      });
    }
    })

    // console.log(marksSet);

    // if (marks != null) {
    //   for (const mark of marks) {
    //     console.log(mark)
    //   }
    // }else{
    //   console.log("no marks found")
    // }

    // editor.view.state.doc.nodesBetween(selection.from, selection.to, node => {
    //             if (node.type.name === 'text' && node.marks.length > 0) {
    //              // do something with node.marks
    //             }
    //           })
  }
);

watch(
  () => editModel.sliderValue,
  (newValue, oldValue) => {
    if (selectedNode == undefined) {
      return;
    }

    // if ((fromLoc.value == 0 && toLoc.value == 0) == false) {
    //   editor.chain().focus().setNode("customNode");
    //   console.log("created custom node");
    //   fromLoc.value = 0;
    //   toLoc.value = 0;
    // }

    let fontWeight = 0;

    if (newValue == 0) {
      fontWeight = 10;
    } else {
      fontWeight = newValue * 10;
    }

    // console.log("new font weight is " + fontWeight.toString())
    editor.commands.setFontWeight(fontWeight.toString());

    return;
  }
);
</script>

<template>
  <editor-content :editor="editor" />
</template>
