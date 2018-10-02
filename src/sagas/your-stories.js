import { select, put } from 'redux-saga/effects'
import { callWith401Handle } from './api'
import { DRAFTS, USER_STORIES, DELETE_STORY } from '../constants/api'
import { get, del } from '../utils/api'
import { receiveStoriesForTab } from '../actions/your-stories';
import { receiveStoryForEdit } from '../actions/editor';
import { to } from '../actions/navigation'

export function* selectTab({ payload }) {
  const { yourStories, auth: { id } } = yield select()
  if (yourStories[payload]) return

  const endpoint = payload === 'drafts' ? DRAFTS : USER_STORIES(id)
  const { stories } = yield callWith401Handle(get, endpoint)
  yield put(receiveStoriesForTab({ stories, tab: payload }))
}

export function* remove({ payload }) {
  yield callWith401Handle(del, DELETE_STORY, payload)
}

export function* edit({ payload }) {
  const { yourStories: { drafts, published } } = yield select()

  const story = [drafts, published].withoutUndef_().flatten_().find(story => story.id === payload)
  console.log(story.content)
  yield put(receiveStoryForEdit(story))
  yield put(to('editor'))
}