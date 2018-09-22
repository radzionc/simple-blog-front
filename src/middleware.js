import createSagaMiddleware from 'redux-saga'

import { unauthorizeUser } from './actions/auth'

export const sagaMiddleware = createSagaMiddleware()

const localStorageMiddleware = store => next => action => {
  if (action.type === unauthorizeUser.getType()) {
    localStorage.clear()
  }

  const prevState = store.getState()
  const result = next(action)
  const nextState = store.getState()

  if (prevState.auth.token !== nextState.auth.token && nextState.auth.token) {
    localStorage.setItem('token', nextState.auth.token)
    localStorage.setItem(
      'tokenExpirationTime',
      nextState.auth.tokenExpirationTime
    )
    localStorage.setItem('id', nextState.auth.id)
    localStorage.setItem('email', nextState.auth.email)
  }
  return result
}

export default [sagaMiddleware, localStorageMiddleware]
