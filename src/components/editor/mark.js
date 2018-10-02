import React from 'react'
import styled from 'styled-components'
import { lime } from '@material-ui/core/colors'

import { switchCase } from '../../utils/generic';

import { MARKS } from '../../constants/editor'


const Code = styled.code`
  font-family: monospace;
  background: ${lime[200]};
  padding: 3px;
`

export default ({ children, mark: { type }, attributes }) => switchCase(
  {
    [MARKS.BOLD]: () => <strong {...attributes}>{children}</strong>,
    [MARKS.ITALIC]: () => <em {...attributes}>{children}</em>,
    [MARKS.CODE]: () => <Code {...attributes}>{children}</Code>
  },
  type,
  () => null
)