import React from 'react'
import { Editor } from 'slate-react'

import { connectTo, switchCase } from '../../utils/generic';
import * as actions from '../../actions/editor'


const Mark = ({ children, mark: { type }, attributes }) => switchCase(
  {
    bold: () => <strong {...attributes}>{children}</strong>,
    italic: () => <em {...attributes}>{children}</em>,
    code: () => <code {...attributes}>{children}</code>
  },
  type,
  () => null
)

const Node = ({ attributes, children, node: { type } }) => switchCase(
  {
    'block-quote': () => <blockquote {...attributes}>{children}</blockquote>,
    'heading-one': () => <h1 {...attributes}>{children}</h1>,
    'heading-two': () => <h2 {...attributes}>{children}</h2>,
    'bulleted-list': () => <ul {...attributes}>{children}</ul>,
    'numbered-list': () => <ol {...attributes}>{children}</ol>,
    'list-item': () => <li {...attributes}>{children}</li>
    // to: link
  },
  type,
  () => null,
)

export default connectTo(
  state => state.editor,
  actions,
  ({ content, changeContent }) => {
    return (
      <Editor
        style={{ paddingTop: '20px', height: '100%' }}
        autoFocus
        placeholder="Type your story here."
        value={content}
        onChange={({ value }) => changeContent(value)}
        renderNode={Node}
        renderMark={Mark}
      />
    )
  }
)