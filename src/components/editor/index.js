import React from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'

import Page from '../page-wrapper'
import EffectsMenu from './effects-menu'
import Title from './title'
import Save from './save'
import Publish from './publish'
import Editor from './editor'
import LinkDialog from './link-dialog'
import TagsDialog from './tags-dialog'
import { connectTo } from '../../utils/generic';

const SIDE_PADDING = 50;

const Container = styled(Paper)`
  margin: ${SIDE_PADDING}px;
  min-height: 320px;
  padding: 20px;
`

const TopLine = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${SIDE_PADDING}px;
`

export default connectTo(
  state => state.editor,
  {},
  ({ linkPrompt, tagsMenuOpen }) => {
    return (
      <Page style={{ padding: `0 ${SIDE_PADDING}px` }}>
        <TopLine>
          <Save/>
          <Publish/>
        </TopLine>
        <Container>
          <Title/>
          <Editor/>
        </Container>
        <EffectsMenu/>
        { linkPrompt && <LinkDialog/> }
        { tagsMenuOpen && <TagsDialog/> }
      </Page>
    )
  }
)
