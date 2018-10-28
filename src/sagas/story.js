import { select } from 'redux-saga/effects'
import { callWith401Handle } from './api'
import { TOGGLE_LIKE } from '../constants/api'
import { post } from '../utils/api'

export function* toggleLike() {
  const { navigation: { storyId } } = yield select()
  yield callWith401Handle(post, TOGGLE_LIKE(storyId))
}