import { select, put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga';

import { TICK } from '../constants/generic'
import { tick as tickAction } from '../actions/generic';
import { SAVE_PERIOD } from '../constants/editor';
import { save } from '../actions/editor';

const enters = { }

export function* enterPage() {
  const state = yield select()
  const pageName = state.navigation.page
  const entersFunc = enters[pageName]
  if (entersFunc) yield entersFunc(state)
}

export function* startApp() {
  window.history.pushState({}, '', '')

  function* ticking() {
    yield put(tickAction())
    yield call(delay, TICK)
    yield* ticking()
  }
  yield* ticking()
}

const exits = {}

export function* exitPage({ payload }) {
  const state = yield select()

  const exitsFunc = exits[payload]
  if (exitsFunc) yield exitsFunc(state)
}

export function* tick() {
  const { navigation: { page } } = yield select()
  if (page === 'editor') {
    const { editor: { lastSave, lastEdit, requestProcess } } = yield select()
    if (!requestProcess && lastEdit && lastEdit > lastSave && Date.now() - lastSave > SAVE_PERIOD) {
      yield put(save())
    }
  }
}
