import React from 'react'
import { TextField } from '@material-ui/core'
import styled from 'styled-components'

import * as actions from '../../actions/editor'
import { connectTo } from '../../utils/generic';

const Container = styled.div`
  width: '100%';
  display: flex;
  justify-content: center;
  margin: 20px;
`

export default connectTo(
  state => state.editor,
  actions,
  ({ changeTitle, title }) => (
    <Container>
      <TextField
        style={{ width: 320 }}
        onChange={({ target: { value } }) => changeTitle(value)}
        value={title}
        label='Title'
      />
    </Container>
  )
)