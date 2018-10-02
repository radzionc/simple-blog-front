import React from 'react'
import { Editor } from 'slate-react'

import { connectTo } from '../../utils/generic';

import Mark from '../editor/mark'
import Node from '../editor/node'
import Page from '../page-wrapper'

export default connectTo(
  state => state.story,
  {},
  ({ title, content, publishTime, ownerUsername }) => {
    return (
      <Page>
        <p>{ownerUsername}</p>
        <p>{publishTime}</p>
        <h1>{title}</h1>
        { content && (
          <Editor
            readOnly
            style={{ paddingTop: '20px', height: '100%' }}
            value={content}
            renderNode={Node}
            renderMark={Mark}
          />
        )}
      </Page>
    )
  }
)