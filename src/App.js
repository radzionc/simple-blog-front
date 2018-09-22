import React from 'react'
import { Provider } from 'react-redux'

import './utils/array-extensions'

import store from './store'
import saga from './sagas/'
import Root from './layouts/main'
import { sagaMiddleware } from './middleware'

import { receiveMockState } from './actions/mock'

import { loggedIn } from './utils/auth'
import { startApp } from './actions/generic'

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  )
}

export default App

sagaMiddleware.run(saga)

loggedIn() && store.dispatch(startApp())

if (process.env.REACT_APP_MOCK) {
  import('./mocks/state.js').then(module => {
    const state = store.getState()
    store.dispatch(
      receiveMockState(
        Object.entries(state).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: { ...value, ...module.MOCK_STATE[key] }
          }),
          {}
        )
      )
    )
  })
}
