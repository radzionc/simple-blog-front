export const BACKEND = process.env.REACT_APP_MAIN_API_URL

const AUTH = `${BACKEND}auth/`
export const LOGIN = `${AUTH}login`
export const REGISTER = `${AUTH}register`

const STORIES = `${BACKEND}stories/`
export const CREATE_STORY = `${STORIES}`
export const UPDATE_STORY = storyId => `${STORIES}${storyId}`
export const PUBLISH_STORY = storyId => `${STORIES}${storyId}/publish`
