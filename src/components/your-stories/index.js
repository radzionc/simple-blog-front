import React from 'react'
import styled from 'styled-components'
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core'

import { connectTo } from '../../utils/generic'
import * as actions from '../../actions/your-stories'
import StoryCard from './story-card'
import Page from '../page-wrapper'
import { toStory } from '../../actions/navigation';
import { timestampForHuman } from '../../utils/time';

import StoriesContainer from '../stories-container'

const UsernameLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`

export default connectTo(
  state => state.yourStories,
  ({ ...actions, toStory }),
  ({ selectTab, remove, drafts, published, shared, tab, edit, toStory }) => {
    const stories = { drafts, published, shared }[tab]
    const tabs = ['drafts', 'published', 'shared']
    const value = tabs.indexOf(tab)
    const renderStories = stories => (
      <StoriesContainer>
        {
          stories.map((story, number) => {
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
                onClick={() => tab === 'published' ? toStory(story.id) : edit(story.id) }
              />
            )
          })

        }
      </StoriesContainer>
    )

    return (
      <Page>
        <AppBar position='static'>
          <Tabs value={value} onChange={(_, v) => selectTab(tabs[v])}>
            <Tab label='drafts' />
            <Tab label='published' />
            <Tab label='shared' />
          </Tabs>
        </AppBar>
        {stories && (tab === 'shared' ? 
          stories.map(({ username, drafts }) => (
            <div key={username}>
              <UsernameLine>
                <Typography color='textSecondary'>
                  {username} drafts
                </Typography>
              </UsernameLine>
              {renderStories(drafts)}
            </div>
          ))
          : renderStories(stories)
        )}
      </Page>
    )
  }
)