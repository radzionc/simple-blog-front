import { takeLatest } from 'redux-saga/effects'

import * as genericActions from '../actions/generic'
import * as genericSagas from './generic'

import * as authActions from '../actions/auth'
import * as authSagas from './auth'

export default function* saga() {
  const relations = [
    [genericActions, genericSagas],
    [authActions, authSagas],
  ]

  for (const [actions, sagas] of relations) {
    for (const [actionName, action] of Object.entries(actions)) {
      const saga = sagas[actionName]
      if (saga) yield takeLatest(action.getType(), saga)
    }
  }
}
