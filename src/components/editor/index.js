import React from 'react'
import styled from 'styled-components'

import Page from '../page-wrapper'
import EffectsMenu from './effects-menu'
import Title from './title'
import Save from './save'
import Publish from './publish'
import Editor from './editor'
import LinkDialog from './link-dialog'
import TagsDialog from './tags-dialog'
import { connectTo } from '../../utils/generic';
import ContentContainer from '../content-container'

const SIDE_PADDING = 50;

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
        <ContentContainer>
          <Title/>
          <Editor/>
        </ContentContainer>
        <EffectsMenu/>
        { linkPrompt && <LinkDialog/> }
        { tagsMenuOpen && <TagsDialog/> }
      </Page>
    )
  }
)
