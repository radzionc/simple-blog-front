import styled from 'styled-components'

import { Card } from '@material-ui/core'

const StyledCard = styled(Card)`
  && {
    cursor: pointer;
    width: 480px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between
  }
`

export default StyledCard