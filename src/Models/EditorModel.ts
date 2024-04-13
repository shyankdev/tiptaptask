import {Node} from '@tiptap/vue-3'

export default interface EditorModel {
    selectedNode: Object | undefined;
    sliderValue: number;

    nodes : Node[]
    
  }

