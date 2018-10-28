import React from 'react'
import { Chip } from '@material-ui/core'

export default ({ ...chipProps }) => (
  <Chip
    { ...chipProps }
    style={{ margin: 10 }}
  />
)