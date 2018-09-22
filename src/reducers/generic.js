import { createReducer } from 'redux-act'
import * as a from '../actions/generic'

const getDefaultState = () => ({
  pageWidth: window.innerWidth,
  pageHeight: window.innerHeight,
  mouseX: 0,
  mouseY: 0
})

export default () =>
  createReducer(
    {
      [a.changePageSize]: (state, { width, height }) => ({
        ...state,
        pageWidth: width,
        pageHeight: height
      }),
      [a.moveMouse]: (state, { mouseX, mouseY }) => ({
        ...state,
        mouseX,
        mouseY
      })
    },
    getDefaultState()
  )
