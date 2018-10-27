import { createReducer } from 'redux-act'
import * as a from '../actions/stories'

const getDefaultState = page => ({
  stories: []
})

export default () => createReducer({
  [a.receiveStories]: (state, stories) => ({ ...state, stories })
}, getDefaultState())