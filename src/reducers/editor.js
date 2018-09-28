import { createReducer } from 'redux-act'

import * as a from '../actions/editor'
import { tick } from '../actions/generic'
import { MAX_TITLE_LENGTH } from '../constants/editor';

const getDefaultState = () => ({
  title: '',
  content: {
    document: {
      nodes: []
    }
  },
  lastSave: Date.now(),
  lastEdit: undefined,
  tagsMenuOpen: false,
  selectedMarks: [],
  changesSaved: true,
})

export default () => createReducer(
  {
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
      selectedMarks: state.selectedMarks.includes(mark) ? state.selectedMarks.without_(mark) : [...state.selectedMarks, mark]
    }),
    [a.successfulSave]: (state, lastSave) => ({
      ...state,
      lastSave
    }),
    [tick]: (state) => ({
      ...state,
      changesSaved: !state.lastEdit || state.lastSave > state.lastEdit
    })
  },
  getDefaultState()
)