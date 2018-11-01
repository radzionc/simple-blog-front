import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { connectTo } from '../utils/generic';
import { toggleSnackbar } from '../actions/generic'

export default connectTo(
  state => state.generic,
  { toggleSnackbar },
  ({ snackbarMessage, toggleSnackbar }) => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={snackbarMessage.length > 0}
      autoHideDuration={3000}
      onClose={() => toggleSnackbar('')}
      onExited={() => toggleSnackbar('')}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span>{snackbarMessage}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => toggleSnackbar('')}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
)