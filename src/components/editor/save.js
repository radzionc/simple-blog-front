import React from 'react'
import { Button } from '@material-ui/core'

import * as actions from '../../actions/editor'
import { connectTo } from '../../utils/generic';

export default connectTo(
  state => state.editor,
  actions,
  ({ changesSaved, save }) => {
    return changesSaved ? (
      <h4>Saved</h4>
    ) : (
      <Button variant='outlined' onClick={save}>
        Save
      </Button>
    )
  }
)