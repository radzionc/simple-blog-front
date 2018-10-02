import { createReducer } from 'redux-act'
import * as a from '../actions/your-stories'

const getState = () => ({
  tab: 'drafts',
  drafts: undefined,
  published: undefined
})

export default _ =>
  createReducer(
    {
      [a.selectTab]: (state, tab) => ({ ...state, tab }),
      [a.remove]: (state, storyId) => ({
        ...state,
        [state.tab]: state[state.tab].filter(story => story.id !== storyId)
      }),
      [a.receiveStoriesForTab]: (state, { stories, tab }) => ({ 
        ...state,
        [tab]: stories
      }),
      [a.clear]: () => getState()
    },
    getState()
  )