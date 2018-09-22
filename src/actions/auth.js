import { createAction } from 'redux-act'

export const submitLogin = createAction()
export const submitRegister = createAction()

export const receiveAuthData = createAction()
export const unauthorizeUser = createAction()
