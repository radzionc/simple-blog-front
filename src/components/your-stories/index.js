import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import styled from 'styled-components'

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/your-stories'
import StoryCard from './story-card'
import Page from '../page-wrapper'
import { toStory } from '../../actions/navigation';
import { timestampForHuman } from '../../utils/time';

const StoriesContainer = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export default connectTo(
  state => state.yourStories,
  ({ ...actions, toStory }),
  ({ selectTab, remove, drafts, published, tab, edit, toStory }) => {
    const stories = { drafts, published }[tab]
    const tabs = ['drafts', 'published']
    const value = ['drafts', 'published'].indexOf(tab)
    return (
      <Page>
        <AppBar position='static'>
          <Tabs value={value} onChange={(_, v) => selectTab(tabs[v])}>
            <Tab label='drafts' />
            <Tab label='published' />
          </Tabs>
        </AppBar>
        <StoriesContainer>
          { stories && stories.map((story, number) => {
            const dateValue = story[tab === 'published' ? 'publishTime' : 'lastEditTime']
            const date = timestampForHuman(dateValue)
            const dateText = `${tab === 'published' ? 'Published on' : 'Last edit'} ${date}`
            return (
              <StoryCard
                key={number}
                title={story.title}
                dateText={dateText}
                onEdit={() => edit(story.id)}
                onDelete={() => remove(story.id)}
                onClick={() => tab === 'drafts' ? edit(story.id) : toStory(story.id) }
              />
            )
          })}
        </StoriesContainer>
      </Page>
    )
  }
)