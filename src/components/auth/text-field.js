import React from 'react'
import styled from 'styled-components'
import { TextField } from '@material-ui/core'

const TextFieldForRender = ({
  input,
  label,
  meta: { active, error, warning },
  ...custom
}) => {
  const message = !active ? error || warning : undefined
  const showError = Boolean(message && input.value)
  return (
    <TextField
      label={label}
      error={showError}
      helperText={message && input.value ? message : undefined}
      {...input}
      {...custom}
    />
  )
}

export default styled(TextFieldForRender)`
  && {
    margin: 5px 0;
  }
`