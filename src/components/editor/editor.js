import React from 'react'
import { Editor } from 'slate-react'
import { Block } from 'slate'

import { connectTo } from '../../utils/generic';
import * as actions from '../../actions/editor'

import Mark from './mark'
import Node from './node'

const schema = {
  document: {
    last: { type: 'paragraph' },
    normalize: (change, { code, node }) => {
      if (code === 'last_child_type_invalid') {
        const paragraph = Block.create('paragraph')
        return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
  },
}

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
        schema={schema}
        onChange={({ value }) => changeContent(value)}
        renderNode={Node}
        renderMark={Mark}
      />
    )
  }
)