import { createReducer } from 'redux-act'
import { Value } from 'slate'

import * as a from '../actions/editor'
import { tick } from '../actions/generic'
import { MAX_TITLE_LENGTH, MARKS, BLOCKS } from '../constants/editor';

const getDefaultState = () => ({
  title: '',
  content: Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph', 
        },
      ],
    },
  }),
  lastSave: Date.now(),
  lastEdit: undefined,
  tagsMenuOpen: false,
  selectedEffects: [],
  changesSaved: true,
  linkPromptOpen: false,
  link: ''
})

const changeContent = (state, content) => ({
  ...state,
  content,
  // to: hack
  lastEdit: JSON.stringify(state.content) === JSON.stringify(content) ? state.lastEdit : Date.now()
})

const hasLink = value => value.inlines.some(inline => inline.type === BLOCKS.LINK)
const unwrapLink = change => change.unwrapInline(BLOCKS.LINK)
const wrapLink = (change, href) => change.wrapInline({
  type: BLOCKS.LINK,
  data: { href }
})

const insertImage = (change, src) => change.insertBlock({
  type: BLOCKS.IMAGE,
  data: { src }
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
      const links = hasLink(content) ? [BLOCKS.LINK] : []
      const selectedEffects = [ ...activeMarks, ...activeBlocks, ...activeLists, ...links ]
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

        const value = state.content
        const change = value.change()
        const { document } = value
        const hasBlock = type => value.blocks.some(node => node.type === type)
        const isList = hasBlock('list-item')

        if (type === BLOCKS.LINK) {
          // no way to make list a link
          if (isList) return state

          if (hasLink(value)) {
            change.call(unwrapLink)
            return changeContent({ ...state, selectedEffects }, change.value)
          }
          // no way to create link when nothing is selected
          if (!value.selection.isExpanded) return state
          return changeContent({ ...state, selectedEffects, linkPromptOpen: true }, change.value)
        }
        if (type === BLOCKS.IMAGE) {
          return changeContent({ ...state, selectedEffects, linkPromptOpen: true }, change.value)
        }
        if (Object(MARKS).values().includes(type)) {
          return changeContent(
            { ...state, selectedEffects },
            change.toggleMark(type)
          )
        } else {
          if (!['bulleted-list', 'numbered-list'].includes(type)) {
            const isActive = hasBlock(type)
      
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
    },
    [a.exitLinkPrompt]: state => ({ ...state, linkPromptOpen: false, link: '', selectedEffects: state.selectedEffects.without_(BLOCKS.LINK) }),
    [a.changeLink]: (state, link) => ({ ...state, link }),
    [a.submitLink]: state => {
      if (!state.link) return ({ ...state, linkPromptOpen: false, selectedEffects: state.selectedEffects.without_(BLOCKS.LINK, BLOCKS.IMAGE) })

      const change = state.content.change()
      change.call(state.selectedEffects.includes(BLOCKS.LINK) ? wrapLink : insertImage, state.link)
      return changeContent({ ...state, linkPromptOpen: false, link: '', }, change.value)
    }
  },
  getDefaultState()
)