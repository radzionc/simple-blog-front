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
  shareDialogOpen: false,
  userToShareName: '',
  editingTag: '',
  saving: false,
})

const updateLastEdit = (oldState, newState) => {
  const sameContent = JSON.stringify(oldState.content) === JSON.stringify(newState.content)
  const sameTags = oldState.tags.sameAs_(newState.tags)
  const sameTitle = oldState.title === newState.title
  return {
    ...newState,
    lastEdit: [sameContent, sameTags, sameTitle].allTrue_() ? oldState.lastEdit : Date.now()
  }
}

const willUpdateLastEdit = func => (oldState, payload) => {
  const newState = func(oldState, payload)
  return updateLastEdit(oldState, newState)
}

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
    [a.changeTitle]: willUpdateLastEdit((state, title) => ({
      ...state,
      title: title.slice(0, MAX_TITLE_LENGTH),
    })),
    [a.changeContent]: willUpdateLastEdit((state, content) => ({
      ...state,
      content
    })),
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

          if (hasLink(value)) {
            change.call(unwrapLink)
            return updateLastEdit(state, { ...state, content: change.value })
          }
          // no way to create link when nothing is selected
          if (!value.selection.isExpanded) return state
          return updateLastEdit(state, { ...state, content: change.value, linkPrompt: BLOCKS.LINK })
        }
        if (type === BLOCKS.IMAGE) {
          return updateLastEdit(state, { ...state, content: change.value, linkPrompt: BLOCKS.IMAGE })
        }
        if (Object.values(MARKS).includes(type)) {
          return updateLastEdit(
            state,
            { ...state, content: change.toggleMark(type).value }
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
      
          return updateLastEdit(state, { ...state, content: change.value })
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
      return updateLastEdit(state, { ...state, content: change.value, linkPrompt: undefined, link: '', })
    },
    [a.toggleTagsMenu]: state => ({
      ...state,
      tagsMenuOpen: !state.tagsMenuOpen
    }),
    [a.editTag]: (state, editingTag) => ({ 
      ...state,
      editingTag
    }),
    [a.submitTag]: willUpdateLastEdit(state => ({
      ...state,
      tags: (state.editingTag ? [ ...state.tags, state.editingTag] : state.tags).uniq_(),
      editingTag: '',
    })),
    [a.deleteTag]: willUpdateLastEdit((state, tag) => ({
      ...state,
      tags: state.tags.without_(tag)
    })),
    [a.receiveStoryForEdit]: (state, story) => ({
      ...getDefaultState(),
      storyId: story.id,
      title: story.title,
      content: Value.fromJSON(JSON.parse(story.content)),
      tags: story.tags,
      lastSave: Date.now(),
    }),
    [a.clear]: () => getDefaultState(),
    [a.toggleShareDialog]: state => ({
      ...state,
      shareDialogOpen: !state.shareDialogOpen
    }),
    [a.share]: state => ({
      ...state,
      shareDialogOpen: false
    }),
    [a.changeUserToShareName]: (state, userToShareName) => ({
      ...state,
      userToShareName
    })
  },
  getDefaultState()
)