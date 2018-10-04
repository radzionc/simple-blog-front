import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
const ContainerInner = styled.div`
  width: 720px;
`

export default ({ children }) => (
  <Container>
    <ContainerInner>
      {children}
    </ContainerInner>
  </Container>
)