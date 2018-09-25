import React from 'react'
import styled from 'styled-components'

const Logo = styled.h1`
  cursor: ${props => props.clickable ? 'pointer' : 'default' };
  margin: 10px;
  text-align: center;
  font-family: 'Dancing Script', cursive;
`

export default ({ onClick }) => <Logo onClick={onClick} clickable={Boolean(onClick)}>Simple Blog</Logo>