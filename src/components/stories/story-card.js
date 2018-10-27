import React from 'react'
import styled from 'styled-components'

import { CardContent, Typography } from '@material-ui/core'
import StoryCardContainer from '../story-card-container'
import Tag from '../tag'

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

export default ({ title , dateText, onClick, ownerUsername, tags }) => {
  return (
    <StoryCardContainer onClick={onClick}>
      <CardContent>
        <Typography style={{ marginBottom: 16, fontSize: 14 }} color='textSecondary'>
          {dateText}
        </Typography>
        <Typography style={{ height: 120 }} variant="headline" component="h2">
          {title}
        </Typography>
        <TagsContainer style={{ height: 100 }}>
          {tags.map(tag => (
            <Tag
              key={tag}
              label={tag}
            />
          ))}
        </TagsContainer>
        <Typography style={{ marginBottom: 16, fontSize: 14 }}>
          written by {ownerUsername}
        </Typography>
      </CardContent>
    </StoryCardContainer>
  )
}