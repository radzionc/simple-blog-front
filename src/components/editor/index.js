import React from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'

import Page from '../page-wrapper'
import MarksMenu from './marks-menu'
import Title from './title'
import Save from './save'
import Publish from './publish'
import Editor from './editor'

const Container = styled(Paper)`
  margin: 40px;
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
`

export default () => {
  return (
    <Page style={{ padding: '0 40px' }}>
      <TopLine>
        <Save/>
        <Publish/>
      </TopLine>
      <Container>
        <Title/>
        <Editor/>
      </Container>
      <MarksMenu/>
    </Page>
  )
}