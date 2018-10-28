import React from 'react'

import { CardActions, CardContent, Button, Typography } from '@material-ui/core'
import { noPropogation } from '../../utils/generic';
import StoryCardContainer from '../story-card-container'

export default ({ title , dateText, onEdit, onDelete, onClick }) => {
  return (
    <StoryCardContainer onClick={onClick}>
      <CardContent>
        <Typography style={{ marginBottom: 16, fontSize: 14 }} color='textSecondary'>
          {dateText}
        </Typography>
        <Typography variant="headline" component="h2">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        { onEdit && (
          <Button onClick={noPropogation(onEdit)} size='small' variant='outlined'>
            Edit
          </Button>
        )}
        { onDelete && (
          <Button onClick={noPropogation(onDelete)} size='small' variant='contained' color='primary'>
            Delete
          </Button>
        )}
      </CardActions>
    </StoryCardContainer>
  )
}