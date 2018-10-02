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
  storyId: undefined,
  lastSave: Date.now(),
  lastEdit: undefined,
  changesSaved: true,
  linkPrompt: undefined,
  link: '',
  tags: [],
  tagsMenuOpen: false,
  editingTag: '',
  saving: false,
})

const changeContent = (state, content) => ({
  ...state,
  content,
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
    [a.changeContent]: changeContent,
    [a.save]: (state) => ({
      ...state,
      saving: true
    }),
    [a.successfulSave]: (state) => ({
      ...state,
      lastSave: Date.now(),
      saving: false
    }),
    [a.successfulCreation]: (state, storyId) => ({
      ...state,
      storyId,
      saving: false
    }),
    [tick]: (state) => ({
      ...state,
      changesSaved: !state.lastEdit || state.lastSave > state.lastEdit
    }),
    [a.toggleEffect]: (state, type) => {
      try {
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
            return changeContent(state, change.value)
          }
          // no way to create link when nothing is selected
          if (!value.selection.isExpanded) return state
          return changeContent({ ...state, linkPrompt: BLOCKS.LINK }, change.value)
        }
        if (type === BLOCKS.IMAGE) {
          return changeContent({ ...state, linkPrompt: BLOCKS.IMAGE }, change.value)
        }
        if (Object.values(MARKS).includes(type)) {
          return changeContent(
            state,
            change.toggleMark(type).value
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
      
          return changeContent(state, change.value)
        }
      } catch(err) {
        console.info('fail to execute effect')
        return state
      }
    },
    [a.exitLinkPrompt]: state => ({ ...state, linkPrompt: undefined, link: '' }),
    [a.changeLink]: (state, link) => ({ ...state, link }),
    [a.submitLink]: state => {
      if (!state.link) return ({ ...state, linkPrompt: undefined })

      const change = state.content.change()
      change.call(state.linkPrompt === BLOCKS.LINK ? wrapLink : insertImage, state.link)
      return changeContent({ ...state, linkPrompt: undefined, link: '', }, change.value)
    },
    [a.toggleTagsMenu]: state => ({
      ...state,
      tagsMenuOpen: !state.tagsMenuOpen
    }),
    [a.editTag]: (state, editingTag) => ({ 
      ...state,
      editingTag
    }),
    [a.submitTag]: state => ({
      ...state,
      tags: (state.editingTag ? [ ...state.tags, state.editingTag] : state.tags).uniq_(),
      editingTag: '',
    }),
    [a.deleteTag]: (state, tag) => ({
      ...state,
      tags: state.tags.without_(tag)
    }),
    [a.receiveStoryForEdit]: (state, story) => ({
      ...getDefaultState(),
      storyId: story.id,
      title: story.title,
      content: Value.fromJSON(JSON.parse(story.content)),
      tags: story.tags,
      lastSave: Date.now(),
    }),
    [a.clear]: () => getDefaultState()
  },
  getDefaultState()
)