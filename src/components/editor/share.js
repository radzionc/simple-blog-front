import React from 'react'
import { Button } from '@material-ui/core'

import * as actions from '../../actions/editor'
import { connectTo } from '../../utils/generic';

export default connectTo(
  state => state.editor,
  actions,
  ({ toggleShareDialog }) => {
    return (
      <Button variant='outlined' color='primary' onClick={toggleShareDialog}>
        Share
      </Button>
    )
  }
)