import React from 'react'
import styled from 'styled-components'
import { purple } from '@material-ui/core/colors'

import { switchCase } from '../../utils/generic';
import { BLOCKS} from '../../constants/editor'


const Quote = styled.blockquote`
  border-left: 2px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
`

const HeadingOne = styled.h1`
  padding: 10px 0;
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

const Image = styled.img`
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? `0 0 0 2px ${purple[200]}` : 'none')};
`


export default ({ attributes, children, node, isFocused }) => switchCase(
  {
    [BLOCKS.QUOTE]: () => <Quote {...attributes}>{children}</Quote>,
    [BLOCKS.HEADING_ONE]: () => <HeadingOne {...attributes}>{children}</HeadingOne>,
    [BLOCKS.HEADING_TWO]: () => <HeadingTwo {...attributes}>{children}</HeadingTwo>,
    [BLOCKS.BULLETED_LIST]: () => <BulletedList {...attributes}>{children}</BulletedList>,
    [BLOCKS.NUMBERED_LIST]: () => <NumberedList {...attributes}>{children}</NumberedList>,
    [BLOCKS.LINK]: () => <a {...attributes} href={node.data.get('href')}>{children}</a>,
    [BLOCKS.IMAGE]: () => <Image src={node.data.get('src')} selected={isFocused} {...attributes} />,
    'list-item': () => <li {...attributes}>{children}</li>
  },
  node.type,
  () => null,
)