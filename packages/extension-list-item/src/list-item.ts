import {
  handleBackspace, handleDelete,
  mergeAttributes, Node,
} from '@tiptap/core'

export interface ListItemOptions {
  HTMLAttributes: Record<string, any>,
  bulletListTypeName: string
  orderedListTypeName: string
}

export const ListItem = Node.create<ListItemOptions>({
  name: 'listItem',

  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: 'bulletList',
      orderedListTypeName: 'orderedList',
    }
  },

  content: 'paragraph block*',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'li',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['li', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
      Delete: ({ editor }) => handleDelete(editor, this.name),
      'Mod-Delete': ({ editor }) => handleDelete(editor, this.name),
      Backspace: ({ editor }) => handleBackspace(editor, this.name, [this.options.bulletListTypeName, this.options.orderedListTypeName]),
      'Mod-Backspace': ({ editor }) => handleBackspace(editor, this.name, [this.options.bulletListTypeName, this.options.orderedListTypeName]),
    }
  },
})
