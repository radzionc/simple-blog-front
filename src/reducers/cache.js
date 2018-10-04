import { createReducer } from 'redux-act'

import * as a from '../actions/cache'
import { receiveStoriesForTab, clear as clearYourStories } from '../actions/your-stories'
import { receiveStory } from '../actions/story';

export const getDefaultState = _ => ({
  stateReceived: {
    login: true,
    register: true,
    editor: true,
    yourStories: false,
    story: false,
    start: true
  }
})

const changeStateReceived = (state, page, value) => ({
  ...state,
  stateReceived: {
    ...state.stateReceived,
    [page]: value
  }
})


export default _ =>
  createReducer(
    {
      // only for sagas usage
      [a.updateState]: (state, newState) => ({ ...state, ...newState }),
      [a.saveCache]: (state, { page, projectId, pageState }) => ({
        ...state,
        stateReceived: {
          ...state.stateReceived,
          [page]: false
        },
        [page]: {
          ...state[page],
          [projectId]: pageState
        },
      }),
      [a.removeStateReceivedFrom]: (state, page) => ({
        ...state,
        stateReceived: {
          ...state.stateReceived,
          [page]: false
        }
      }),
      [receiveStoriesForTab]: state => changeStateReceived(state, 'yourStories', true),
      [clearYourStories]: state => changeStateReceived(state, 'yourStories', false),
      [receiveStory]: state => changeStateReceived(state, 'story', true),
    },
    getDefaultState()
  )
