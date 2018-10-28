import React from 'react'
import { Editor } from 'slate-react'
import { Typography, IconButton } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
import styled from 'styled-components'

import { connectTo } from '../../utils/generic';

import ContentContainer from '../content-container'
import Mark from '../editor/mark'
import Node from '../editor/node'
import Page from '../page-wrapper'
import Tag from '../tag'
import { timestampForHuman } from '../../utils/time';
import * as actions from '../../actions/story'

const Info = styled.div`
  margin: 20px;
`

const Chips = styled.div`
  display: flex;
  flex-direction: row;
`

const Likes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LikesNumber = styled.p`
  margin-left: 10px;
`

export default connectTo(
  state => ({
    ...state.story,
    userId: state.auth.id
  }),
  actions,
  ({ title, content, publishTime, ownerUsername, ownerId, tags, userId, likesNumber, liked, toggleLike }) => {
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
          <Likes>
            <IconButton
              disabled={userId === ownerId}
              onClick={toggleLike}
            >
              {liked ? <Favorite color='secondary' /> : <FavoriteBorder color='secondary'/>}
            </IconButton>
            <LikesNumber>{likesNumber}</LikesNumber>
          </Likes>
        </ContentContainer>
      </Page>
    )
  }
)