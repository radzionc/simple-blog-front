import { select, put, call, take, spawn } from 'redux-saga/effects'
import { delay, eventChannel } from 'redux-saga';

import { TICK } from '../constants/generic'
import { tick as tickAction, toggleSnackbar } from '../actions/generic';
import { SAVE_PERIOD } from '../constants/editor';
import { save, clear as clearEditor } from '../actions/editor';
import { clear as clearYourStories } from '../actions/your-stories'
import { receiveStory } from '../actions/story'
import { receiveStories } from '../actions/stories'
import { selectTab } from '../actions/your-stories';
import { callWith401Handle } from './api'
import { get } from '../utils/api'
import { STORY_DETAIL, STORIES } from '../constants/api';
import { removeStateReceivedFrom } from '../actions/cache';
import * as signalR from '@aspnet/signalr'


const enters = {
  yourStories: function*(state) {
    yield put(selectTab(state.yourStories.tab))
  },
  story: function*(state) {
    const storyId = state.navigation.storyId
    const story = yield callWith401Handle(get, STORY_DETAIL(storyId))
    yield put(receiveStory(story))
  },
  stories: function*(state) {
    const { stories } = yield callWith401Handle(get, STORIES)
    yield put(receiveStories(stories))
  }
}

export function* enterPage() {
  const state = yield select()
  const pageName = state.navigation.page
  const entersFunc = enters[pageName]
  if (entersFunc) yield entersFunc(state)
}

function* listenNotifications() {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/notifications", { accessTokenFactory: () => localStorage.token })
    .build()
    
  let attempt = 0
  let connected = false
  while(attempt < 10 && !connected) {
    attempt++
    connected = true
    try {
      yield call(() => connection.start())
      console.info('SignalR: successfully connected')
    } catch(err) {
      console.info(`SignalR: attempt ${attempt}: failed to connect`)
      yield call(delay, 1000)
      connected = false
    }
  }

  if (connected) {
    const getEventChannel = connection => eventChannel(emit => {
      const handler = data => { emit(data) }
      connection.on('notification', handler)
      return () => { connection.off() }
    })
  
    const channel = yield call(getEventChannel, connection)
    while(true) {
      const { notificationType, payload } = yield take(channel)
      const message = `${payload.username} ${notificationType.toLowerCase()}d "${payload.storyTitle}"`
      yield put(toggleSnackbar(message))
    }
  }
}

export function* startApp() {
  window.history.pushState({}, '', '')
  
  yield spawn(listenNotifications)

  function* ticking() {
    yield put(tickAction())
    yield call(delay, TICK)
    yield* ticking()
  }
  yield* ticking()
}

const exits = {
  editor: function* () {
    yield put(clearEditor())
  },
  yourStories: function* () {
    yield put(clearYourStories())
  },
  story: function* () {
    yield put(removeStateReceivedFrom('story'))
  }
}

export function* exitPage({ payload }) {
  const state = yield select()

  const exitsFunc = exits[payload]
  if (exitsFunc) yield exitsFunc(state)
}

export function* tick() {
  const { navigation: { page } } = yield select()
  if (page === 'editor') {
    const { editor: { lastSave, lastEdit, saving } } = yield select()
    if (!saving && lastEdit && lastEdit > lastSave && Date.now() - lastSave > SAVE_PERIOD) {
      yield put(save())
    }
  }
}
