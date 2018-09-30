import React from 'react'
import { MenuList, MenuItem, Paper } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBold,
  faItalic,
  faQuoteRight,
  faLink,
  faCode,
  faListOl,
  faListUl,
  faHeading,
  faImage
} from '@fortawesome/fontawesome-free-solid'
import styled from 'styled-components'

import * as actions from '../../actions/editor'
import { connectTo } from '../../utils/generic'
import { MARKS, BLOCKS } from '../../constants/editor'

const Container = styled(Paper)`
  width: 50px;
  position: fixed;
  right: 20px;
  bottom: 20px;
`

const Effect = styled(MenuItem)`
  && {
    display: flex;
    justify-content: center;
  }
`

export default connectTo(
  state => state.editor,
  actions,
  ({ selectedEffects, toggleEffect }) => {
    const items = [
      [faBold, MARKS.BOLD],
      [faItalic, MARKS.ITALIC],
      [faCode, MARKS.CODE],
      [faLink, BLOCKS.LINK],
      [faImage, BLOCKS.IMAGE],
      [faHeading, BLOCKS.HEADING_ONE],
      [faHeading, BLOCKS.HEADING_TWO],
      [faListOl, BLOCKS.NUMBERED_LIST],
      [faListUl, BLOCKS.BULLETED_LIST],
      [faQuoteRight, BLOCKS.QUOTE],
    ].map(([ icon, effect]) => (
      <Effect
        key={effect}
        selected={selectedEffects.includes(effect)}
        onClick={() => toggleEffect(effect)}
      >
        <FontAwesomeIcon
          icon={icon}
          size={effect !== BLOCKS.HEADING_TWO ? 'sm' : 'xs'}
        />
      </Effect>
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