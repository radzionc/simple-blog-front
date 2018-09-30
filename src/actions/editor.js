import { createAction } from 'redux-act'

export const changeTitle = createAction()
export const toggleEffect = createAction()
export const save = createAction()
export const changeContent = createAction()
export const successfulSave = createAction()
export const changeLink = createAction()
export const exitLinkPrompt = createAction()
export const submitLink = createAction()

export const toggleTagsMenu = createAction()
export const editTag = createAction()
export const submitTag = createAction()
export const deleteTag = createAction()
export const publish = createAction()