import { select, put } from 'redux-saga/effects'
import { callWith401Handle } from './api'
import { DRAFTS, USER_STORIES, DELETE_STORY, SHARED } from '../constants/api'
import { get, del } from '../utils/api'
import { receiveStoriesForTab } from '../actions/your-stories';
import { receiveStoryForEdit } from '../actions/editor';
import { to } from '../actions/navigation'

export function* selectTab({ payload }) {
  const { yourStories, auth: { id } } = yield select()
  if (yourStories[payload]) return
  
  const endpoint = payload === 'drafts' ? DRAFTS : payload === 'shared' ? SHARED : USER_STORIES(id)
  const response = yield callWith401Handle(get, endpoint)
  const actionPayload = { stories: payload === 'shared' ? response.usersDrafts : response.stories, tab: payload }
  yield put(receiveStoriesForTab(actionPayload))
}

export function* remove({ payload }) {
  yield callWith401Handle(del, DELETE_STORY, payload)
}

export function* edit({ payload }) {
  const { yourStories: { drafts, published, shared, tab } } = yield select()

  const story = [drafts, published, shared.map(s => s.drafts).flatten_()].withoutUndef_().flatten_().find(story => story.id === payload)
  yield put(receiveStoryForEdit({ ...story, owner: tab !== 'shared' }))
  yield put(to('editor'))
}