import { createReducer } from 'redux-act'
import * as a from '../actions/navbar'

const getState = () => ({
  dropdownOpen: false,
  dropdownAnchor: undefined
})

export default _ =>
  createReducer(
    {
      [a.toggleDropdown]: (state, dropdownAnchor) => {
        const dropdownOpen = !state.dropdownOpen
        return {
          ...state,
          dropdownOpen,
          dropdownAnchor: dropdownOpen ? dropdownAnchor : undefined
        }
      }
    },
    getState()
  )