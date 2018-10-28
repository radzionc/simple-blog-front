import { createReducer } from 'redux-act'
import { Value } from 'slate'

import * as a from '../actions/story'

const getDefaultState = () => ({
  storyId: undefined,
  ownerUsername: undefined,
  ownerId: undefined,
  publishTime: undefined,
  titile: undefined,
  content: undefined,
  tags: [],
  likesNumber: 0,
  liked: false,
})
 
export default _ =>
  createReducer(
    {
      [a.receiveStory]: (state, story) => ({
        ...state,
        ...story,
        storyId: story.id,
        content: Value.fromJSON(JSON.parse(story.content)),
      }),
      [a.toggleLike]: (state) => ({
        ...state,
        liked: !state.liked,
        likesNumber: state.liked ? state.likesNumber - 1 : state.likesNumber + 1
      })
    },
    getDefaultState()
  )
