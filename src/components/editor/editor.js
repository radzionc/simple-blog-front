import React from 'react'
import { Editor } from 'slate-react'
import styled from 'styled-components'
import { lime } from '@material-ui/core/colors'

import { connectTo, switchCase } from '../../utils/generic';
import * as actions from '../../actions/editor'
import { MARKS, BLOCKS} from '../../constants/editor'


const Code = styled.code`
  font-family: monospace;
  background: ${lime[200]};
  padding: 3px;
`

const Quote = styled.blockquote`
  border-left: 2px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
`

const HeadingOne = styled.h1`
  padding: 10px 0 ;
`

const HeadingTwo = styled.h2`
  padding: 8px 0;
`

const BulletedList = styled.ul`
  margin: 0 40px;
`

const NumberedList = styled.ol`
  padding: 0 40px;
`

const Mark = ({ children, mark: { type }, attributes }) => switchCase(
  {
    [MARKS.BOLD]: () => <strong {...attributes}>{children}</strong>,
    [MARKS.ITALIC]: () => <em {...attributes}>{children}</em>,
    [MARKS.CODE]: () => <Code {...attributes}>{children}</Code>
  },
  type,
  () => null
)

const Node = ({ attributes, children, node }) => switchCase(
  {
    [BLOCKS.QUOTE]: () => <Quote {...attributes}>{children}</Quote>,
    [BLOCKS.HEADING_ONE]: () => <HeadingOne {...attributes}>{children}</HeadingOne>,
    [BLOCKS.HEADING_TWO]: () => <HeadingTwo {...attributes}>{children}</HeadingTwo>,
    [BLOCKS.BULLETED_LIST]: () => <BulletedList {...attributes}>{children}</BulletedList>,
    [BLOCKS.NUMBERED_LIST]: () => <NumberedList {...attributes}>{children}</NumberedList>,
    [BLOCKS.LINK]: () => <a {...attributes} href={node.data.get('href')}>{children}</a>,
    'list-item': () => <li {...attributes}>{children}</li>
    // to: link
  },
  node.type,
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