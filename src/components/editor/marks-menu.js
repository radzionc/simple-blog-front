import React from 'react'
import { MenuList, MenuItem, Paper } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBold,
  faItalic,
  // faLink,
  faQuoteRight,
  faCode,
  faListOl,
  faListUl,
  faHeading
} from '@fortawesome/fontawesome-free-solid'
import styled from 'styled-components'

import * as actions from '../../actions/editor'
import { connectTo } from '../../utils/generic'

const Container = styled(Paper)`
  width: 50px;
  position: absolute;
  right: 20px;
  bottom: 20px;
`

const Mark = styled(MenuItem)`
  && {
    display: flex;
    justify-content: center;
  }
`

export default connectTo(
  state => state.editor,
  actions,
  ({ selectedMarks, toggleMark }) => {
    const items = [
      [faBold, 'bold'],
      [faItalic, 'italic'],
      // [faLink, 'link'],
      [faCode, 'code'],
      [faHeading, 'heading-one'],
      [faHeading, 'heading-two'],
      [faListOl, 'numbered-list'],
      [faListUl, 'bulleted-list'],
      [faQuoteRight, 'block-quote']
    ].map(([ icon, mark]) => (
      <Mark
        key={mark}
        selected={selectedMarks.includes(mark)}
        onClick={() => toggleMark(mark)}
      >
        <FontAwesomeIcon
          icon={icon}
          size={mark !== 'heading-two' ? 'sm' : 'xs'}
        />
      </Mark>
    ))

    return (
      <Container>
        <MenuList open={true}>
          {items}
        </MenuList>
      </Container>
    )
  }
)