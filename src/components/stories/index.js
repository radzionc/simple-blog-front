import _ from 'lodash'
import React from 'react'

import Page from '../page-wrapper'
import { connectTo } from '../../utils/generic';
import StoriesContainer from '../stories-container';
import StoryCard from './story-card'
import { toStory } from '../../actions/navigation';
import { timestampForHuman } from '../../utils/time';

export default connectTo(
  state => state.stories,
  { toStory },
  ({ stories, toStory }) => (
    <Page>
      <StoriesContainer>
        {_.sortBy(stories, ['publishTime']).reverse().map((story, number) => {
          const date = timestampForHuman(story.publishTime)
          const dateText = `Published on ${date}`

          return (
            <StoryCard
              title={story.title}
              ownerUsername={story.ownerUsername}
              tags={story.tags}
              key={number}
              dateText={dateText}
              onClick={() => toStory(story.id)}
            />
          )
        })}
      </StoriesContainer>
    </Page>
  )
)