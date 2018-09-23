import React from 'react'
import { Paper, Button } from '@material-ui/core'
import styled from 'styled-components'

import Page from '../page-wrapper'
import { submitAsyncValidation} from '../../utils/forms'

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Container = styled(Paper)`
  width: 320px;
  padding: 20px;
`


const SubmitButton = styled(Button)`
  && {
    margin-top: 20px;
  }
`


const BottomText = styled(Button)`
  && {
    margin-top: 10px;
  }
`

const Logo = styled.h1`
  margin: 10px;
  text-align: center;
  font-family: 'Dancing Script', cursive;
`

export default ({ handleSubmit, enabledSubmit, onSubmit, submitText, onBottomTextClick, bottomText, fields }) => {
  const pageStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
  return (
    <Page style={pageStyle}>
      <Container>
        <Form
          onSubmit={submitAsyncValidation(handleSubmit, enabledSubmit, onSubmit)}
        >
          <Logo>Simple Blog</Logo>
          {fields}
          <SubmitButton type="submit" variant="outlined" disabled={!enabledSubmit}>{submitText}</SubmitButton>
        </Form>
      </Container>
      <BottomText onClick={onBottomTextClick} color='primary' size='small'>{bottomText}</BottomText>
    </Page>
  )
}
