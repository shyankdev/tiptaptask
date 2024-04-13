<script setup lang="ts">
import { Editor, EditorContent, Node } from "@tiptap/vue-3";
// import {TextSelection} from '@tiptap/vue-3'
import { ref, onMounted, onBeforeUnmount } from "vue";
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
    console.log("exported text is " + txt);
    console.log("exported htnl is " + html);
    // console.log("exported attr is ")
    // console.log(attribute)

    let doc = editor.view.state.doc;

    let words: Array<{ [key: string]: any }>  = [];

    doc.descendants((node) => {
      if (node.isText) {
        node.marks.forEach((mark) => {
          // marksSet.add(mark.type); // Add the mark type to the Set
          // console.log("mark found");
          // console.log(node.type.name);
          // console.log(mark.toJSON()); // attrs key in object have another obbject and in that key fontWeight have weight string
          // console.log(mark.attrs);
          // console.log(node.text); // actual text

          let markJson : { [key: string]: any }  = mark.toJSON();
          // let aka = markJson.valueOf("vfd")
          console.log(markJson)
          let attrs = markJson["attrs"] as { [key: string]: any } | undefined;
          console.log(attrs)
          if (attrs == undefined) {return}
          
          let fontWeight = attrs["fontWeight"] as String | undefined

          if (fontWeight == undefined) {
            return
          }

          let text = node.text
          if (text == undefined) {return}
          console.log(node.text)
          console.log(fontWeight)

          let newWord : { [key: string]: any } = {
            "text" : node.text , 
            "fontWeight": fontWeight
          }
          words.push(newWord)
          // if hask
          // let weight = attrs
          // let newWord = []
        });
        console.log("final word list ")
        console.log(words)

        downloadArrayAsFile(words , "words")
      }
    });
  }
);

function downloadArrayAsFile(data: any[], fileName: string) {
  // Convert array to JSON string
  const jsonData = JSON.stringify(data, null, 2);

  // Create Blob from JSON string
  const blob = new Blob([jsonData], { type: 'application/json' });

  // Create object URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = fileName;

  // Append the download link to the body
  document.body.appendChild(downloadLink);

  // Trigger the click event to initiate download
  downloadLink.click();

  // Cleanup: remove the download link and revoke the object URL
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);
}



watch(
  () => editModel.sliderValue,
  (newValue, oldValue) => {
    if (selectedNode == undefined) {
      return;
    }
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
  <!-- <editor-content class="h-40" :editor="editor" /> -->
  <div class="max-h-96 overflow-auto">
    <!-- Tiptap editor component -->
    <editor-content :editor="editor" />
  </div>
</template>
