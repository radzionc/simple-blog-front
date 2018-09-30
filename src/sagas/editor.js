import { put } from 'redux-saga/effects'


import { successfulSave } from "../actions/editor";

export function* save() {
  const requestTime = Date.now()
  yield put(successfulSave(requestTime))
}

export function* publish() {
  console.log('publish time !!!')
}