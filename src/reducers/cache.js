import { createReducer } from 'redux-act'

import { updateState, saveCache } from '../actions/cache'


export const getDefaultState = _ => ({
  stateReceived: {
    login: true,
    register: true,
  }
})


export default _ =>
  createReducer(
    {
      // only for sagas usage
      [updateState]: (state, newState) => ({ ...state, ...newState }),
      [saveCache]: (state, { page, projectId, pageState }) => ({
        ...state,
        stateReceived: {
          ...state.stateReceived,
          [page]: false
        },
        [page]: {
          ...state[page],
          [projectId]: pageState
        }
      })
    },
    getDefaultState()
  )
