import React from 'react'
import { Button } from '@material-ui/core'

import * as actions from '../../actions/editor'
import { connectTo } from '../../utils/generic';

export default connectTo(
  state => state.editor,
  actions,
  ({ changesSaved, save }) => {
    return changesSaved ? (
      <p>Saved</p>
    ) : (
      <Button variant='outlined' onClick={save}>
        Save
      </Button>
    )
  }
)