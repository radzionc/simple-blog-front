import { createReducer } from 'redux-act'
import { Value } from 'slate'

import * as a from '../actions/editor'
import { tick } from '../actions/generic'
import { MAX_TITLE_LENGTH } from '../constants/editor';

const getDefaultState = () => ({
  title: '',
  content: Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          // nodes: [ 
          //   { 
          //     object: 'block', 
          //     type: 'paragraph', 
          //     nodes: [], 
          //   }, 
          // ], 
        },
      ],
    },
  }),
  lastSave: Date.now(),
  lastEdit: undefined,
  tagsMenuOpen: false,
  selectedEffects: [],
  changesSaved: true,
})

const changeContent = (state, content) => ({
  ...state,
  content,
  // to: hack
  lastEdit: JSON.stringify(state.content) === JSON.stringify(content) ? state.lastEdit : Date.now()
})

export default () => createReducer(
  {
    [a.changeTitle]: (state, title) => ({
      ...state,
      title: title.slice(0, MAX_TITLE_LENGTH),
      lastEdit: Date.now()
    }),
    [a.changeContent]: (state, content) => {
      const activeMarks = content.activeMarks.map(mark => mark.type).toArray()
      const lists = ['numbered-list', 'bulleted-list']
      const activeBlocks = content.blocks.map(block => block.type).toArray().without_(...lists)

      const first = content.blocks.first()
      const activeLists = first ? lists.filter(list => {
        const parent = content.document.getParent(first.key)
        return content.blocks.some(node => node.type === 'list-item') && parent && parent.type === list
      }) : []
      const selectedEffects = [ ...activeMarks, ...activeBlocks, ...activeLists ]
      return changeContent({ ...state, selectedEffects }, content)
    },
    [a.successfulSave]: (state, lastSave) => ({
      ...state,
      lastSave
    }),
    [tick]: (state) => ({
      ...state,
      changesSaved: !state.lastEdit || state.lastSave > state.lastEdit
    }),
    [a.toggleEffect]: (state, type) => {
      try {
        const selectedEffects = state.selectedEffects.includes(type) ?
        state.selectedEffects.without_(type) :
        [...state.selectedEffects, type]
        if (['bold', 'italic', 'code'].includes(type)) {
          const { value } = state.content.change().toggleMark(type)
          return changeContent({ ...state, selectedEffects }, value)
        } else {
          const value = state.content
          const change = value.change()
          const { document } = value
          const hasBlock = type => value.blocks.some(node => node.type === type)
          if (!['bulleted-list', 'numbered-list'].includes(type)) {
            const isActive = hasBlock(type)
            const isList = hasBlock('list-item')
      
            if (isList) {
              change
                .setBlocks(isActive ? 'paragraph' : type)
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
            } else {
              change.setBlocks(isActive ? 'paragraph' : type)
            }
          } else {
            // Handle the extra wrapping required for list buttons.
            const isList = hasBlock('list-item')
            const isType = value.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === type))
      
            if (isList && isType) {
              change
                .setBlocks('paragraph')
                .unwrapBlock('bulleted-list')
                .unwrapBlock('numbered-list')
            } else if (isList) {
              change
                .unwrapBlock(
                  type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                )
                .wrapBlock(type)
            } else {
              change.setBlocks('list-item').wrapBlock(type)
            }
          }
      
          return changeContent({ ...state, selectedEffects }, change.value)
        }
      } catch(err) {
        console.info('fail to execute effect')
        return state
      }
    }
  },
  getDefaultState()
)