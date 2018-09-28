import { createReducer } from 'redux-act'

import * as a from '../actions/auth'
import { takeIfExists } from '../utils/localStorage'

const getDefaultState = _ => ({
  token: takeIfExists('token'),
  id: takeIfExists('id'),
  tokenExpirationTime: takeIfExists('tokenExpirationTime', Number),
})

export default _ =>
  createReducer(
    {
      [a.receiveAuthData]: (state, { token, tokenExpirationTime, id }) => ({
        ...state,
        id,
        token,
        tokenExpirationTime
      }),
      [a.unauthorizeUser]: () => ({})
    },
    getDefaultState()
  )
