<script setup lang="ts">
import { Editor, EditorContent, Node } from "@tiptap/vue-3";
// import {TextSelection} from '@tiptap/vue-3'
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
import {FontSize , FontWeight} from "../FontWeightExtension"
// import { FontWeight} from "../FontWeightExtension"

const props = defineProps(["editModel"]);

const editModel: EditorModel = props.editModel;
console.log("edit mode  in tiptap class is ");
console.log(editModel);

let selectedNode: Node<any, any> | undefined = undefined;

// const aka = new Editor({})
// const editor = useEditor({

const CustomNode = Node.create({
  name: 'customNode',

  group: 'inline',

  inline: true,

  // Your code goes here.
})

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
    FontWeight ,
    CustomNode
  ],

  onSelectionUpdate({ editor }) {
    console.log("on selection update editor");
    // console.log(editor.chain().focus())
    // if (editor.isEmpty) {
    //   editModel.selectedNode = undefined;
    //   return;
    // }
    const selec = editor.view.state.selection;
    const fromLoc = selec.from;
    const toLoc = selec.to;

    if (fromLoc == toLoc) {
      editModel.selectedNode = undefined;
      return;
    }

    const selectedItem: Object = editor.chain().focus();

    const newNode = Node.create({
      from: fromLoc,
      to: toLoc,
    });
    selectedNode = newNode;
    console.log("newly created node is ");
    console.log(newNode);
    // editor.chain().focus().setBold().run()
    // selectedItem.toggleBold().run()

    // const count = selectedItem.toString.length;

    // console.log("selection item has a lenght of " + count);

    editModel.selectedNode = selectedItem;
    // const msg = selec.toJSON()
    console.log("hall selected length is ");
    console.log(selec.toJSON());
    // const fromLoc = selec.from
    // const toLoc = selec.to
    console.log("locaton for selection are ");
    console.log(fromLoc);
    console.log(toLoc);

    // editModel.sliderValue = 0
    // The selection has changed.
  },
});

watch( () => editModel.exportGetTextSignal , (newVal , oldVal) => {
  const txt = editor.getText() 
  const html = editor.getHTML()
  
  const attribute = editor.getAttributes("span")
  console.log("exported text is " + txt)
  console.log("exported htnl is " + html)
  console.log("exported attr is ")
  console.log(attribute)
})

watch(() => editModel.sliderValue , (newValue , oldValue) => {

  if (selectedNode == undefined) {
    return;
  }


  let fontWeight = 0


  if (newValue == 0) {
    fontWeight =  10
  }else{
    fontWeight = newValue * 10
  }

  // console.log("new font weight is " + fontWeight.toString())
  editor.commands.setFontWeight(fontWeight.toString())

  return;
  
})


</script>

<template>
  <editor-content :editor="editor" />
</template>
