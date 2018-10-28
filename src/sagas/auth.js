import { put, call } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'

import { to } from '../actions/navigation'
import { receiveAuthData } from '../actions/auth'
import { LOGIN, REGISTER } from '../constants/api'
import { post } from '../utils/api'
import { startApp } from '../actions/generic'

const authSaga = (url, thanGoTo) =>
  function*({ payload: { values, reject } }) {
    try {
      const authData = yield call(post, url, values)
      yield put(receiveAuthData(authData))
      yield put(startApp())
      yield put(to(thanGoTo))
    } catch ({ status, message }) {
      yield call(reject, new SubmissionError(message))
    }
  }

export const submitLogin = authSaga(LOGIN, 'stories')
export const submitRegister = authSaga(REGISTER, 'stories')
