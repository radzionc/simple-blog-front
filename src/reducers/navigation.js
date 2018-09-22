import { createReducer } from 'redux-act'
import { to } from '../actions/navigation'

import { unauthorizeUser } from '../actions/auth'
import { loggedIn } from '../utils/auth'

const getDefaultState = page => ({
  page,
})

const forward = (state, page) => ({ state, page })

export default _ =>
  createReducer(
    {
      [to]: forward,
      [unauthorizeUser]: state => forward(state, 'login'),
    },
    getDefaultState(process.env.REACT_APP_MOCK
        ? undefined
        : loggedIn() ? 'start' : 'login'
    )
  )
