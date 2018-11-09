import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/editor'

export default connectTo(
  state => state.editor,
  actions,
  ({ changeUserToShareName, toggleShareDialog, share }) => (
    <Dialog
      open={true}
      onClose={toggleShareDialog}
      aria-labelledby="form-share"
    >
      <DialogTitle id="form-share">Enter username</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="share"
          label="Username"
          type="text"
          style={{ minWidth: 320 }}
          fullWidth
          onChange={({ target: { value } }) => changeUserToShareName(value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleShareDialog} color='primary'>
          Cancel
        </Button>
        <Button onClick={share} color='primary'>
          Submit
        </Button>
      </DialogActions>      
    </Dialog>
  )
)