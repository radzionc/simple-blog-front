import { createReducer } from 'redux-act'

import * as a from '../actions/editor'
import { MAX_TITLE_LENGTH } from '../constants/editor';

const getDefaultState = () => ({
  title: '',
  content: {
    document: {
      nodes: []
    }
  },
  lastSave: undefined,
  lastEdit: undefined,
  tagsMenuOpen: false,
  selectedMarks: []
})

export default () =>
  createReducer({
    [a.changeTitle]: (state, title) => ({
      ...state,
      title: title.slice(0, MAX_TITLE_LENGTH),
      lastEdit: Date.now()
    }),
    [a.changeContent]: (state, content) => ({
      ...state,
      content,
      lastEdit: Date.now()
    }),
    [a.toggleMark]: (state, mark) => ({
      ...state,
      selectedMarks: selectedMarks.includes(mark) ? selectedMarks.without(mark) : [...selectedMarks, mark]
    })
  })