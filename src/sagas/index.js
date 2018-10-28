import { takeLatest } from 'redux-saga/effects'

import * as genericActions from '../actions/generic'
import * as genericSagas from './generic'

import * as authActions from '../actions/auth'
import * as authSagas from './auth'

import * as editorActions from '../actions/editor'
import * as editorSagas from './editor'

import * as yourStoriesActions from '../actions/your-stories'
import * as yourStoriesSagas from './your-stories'

import * as storyActions from '../actions/story'
import * as storySagas from './story'

export default function* saga() {
  const relations = [
    [genericActions, genericSagas],
    [authActions, authSagas],
    [editorActions, editorSagas],
    [yourStoriesActions, yourStoriesSagas],
    [storyActions, storySagas]
  ]

  for (const [actions, sagas] of relations) {
    for (const [actionName, action] of Object.entries(actions)) {
      const saga = sagas[actionName]
      if (saga) yield takeLatest(action.getType(), saga)
    }
  }
}
