import React from 'react'
import { Editor } from 'slate-react'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'

import { connectTo } from '../../utils/generic';

import ContentContainer from '../content-container'
import Mark from '../editor/mark'
import Node from '../editor/node'
import Page from '../page-wrapper'
import Tag from '../tag'
import { timestampForHuman } from '../../utils/time';

const Info = styled.div`
  margin: 20px;
`

const Chips = styled.div`
  display: flex;
  flex-direction: row;
`

export default connectTo(
  state => state.story,
  {},
  ({ title, content, publishTime, ownerUsername, tags }) => {
    return (
      <Page>
        <ContentContainer>
          <Info>
            <Typography variant="subheading" gutterBottom>
              author: {ownerUsername}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {timestampForHuman(publishTime)}
            </Typography>
          </Info>
          <Typography variant="display2" gutterBottom>{title}</Typography>
          { content && (
            <Editor
              readOnly
              style={{ paddingTop: '20px' }}
              value={content}
              renderNode={Node}
              renderMark={Mark}
            />
          )}
          <Chips>
            {
              tags.map(tag => (
                <Tag
                  label={tag}
                  key={tag}
                />
              ))
            }
          </Chips>
        </ContentContainer>
      </Page>
    )
  }
)