import React from 'react'
import { TextField } from '@material-ui/core'

import * as actions from '../../actions/editor'
import { connectTo } from '../../utils/generic';

export default connectTo(
  state => state.editor,
  actions,
  ({ changeTitle, title }) => (
    <TextField
      onChange={({ target: { value } }) => changeTitle(value)}
      fullWidth
      value={title}
      label='Title'
    />
  )
)