import { createReducer } from 'redux-act'
import * as a from '../actions/navigation'

import { unauthorizeUser } from '../actions/auth'
import { loggedIn } from '../utils/auth'

const getDefaultState = page => ({
  page,
  storyId: undefined
})

const forward = (state, page) => ({ state, page })

export default _ =>
  createReducer(
    {
      [a.to]: forward,
      [a.toStory]: (state, storyId) => ({ ...state, page: 'story', storyId }),
      [unauthorizeUser]: state => forward(state, 'login'),
    },
    getDefaultState(process.env.REACT_APP_MOCK
        ? undefined
        : loggedIn() ? 'start' : 'login'
    )
  )
