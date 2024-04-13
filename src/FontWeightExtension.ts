import { Extension } from "@tiptap/vue-3";


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      fontSize: {
        /**
         * Set the font size
         */
        setFontSize: (size: string) => ReturnType;
        /**
         * Unset the font size
         */
        unsetFontSize: () => ReturnType;
      };
    }
  }

  export const FontSize = Extension.create({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle'],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
                        renderHTML: attributes => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setFontSize: fontSize => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: fontSize + "px" })
                    .run();
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .setMark('textStyle', { fontSize: null })
                    .removeEmptyTextStyle()
                    .run();
            },
        };
    },
});

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
      fontWeight: {
        setFontWeight: (weight: string) => ReturnType;
        unsetFontWeight: () => ReturnType;
      };
    }
  }

//   import { Extension } from '@tiptap/core';

export const FontWeight = Extension.create({
  name: 'fontWeight',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontWeight: {
            default: null,
            parseHTML: element => element.style.fontWeight || null,
            renderHTML: attributes => {
              if (!attributes.fontWeight) {
                return {};
              }
              return {
                style: `font-weight: ${attributes.fontWeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontWeight: fontWeight => ({ chain }) => {
        return chain().setMark('textStyle', { fontWeight }).run();
      },
      unsetFontWeight: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontWeight: null }).removeEmptyTextStyle().run();
      },
    };
  },
});
