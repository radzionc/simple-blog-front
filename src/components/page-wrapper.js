import _ from 'lodash'
import DocumentTitle from 'react-document-title'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components'

import React from 'react'
import { HotKeys } from 'react-hotkeys'
import { connectTo } from '../utils/generic'
import { enterPage, exitPage } from '../actions/generic'

import Snackbar from './snackbar'


const Loading = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

class PageWrapper extends React.Component {
  render() {
    const {
      children,
      keyMap,
      handlers,
      stateReceived,
      page,
      documentTitle = 'Simple Blog',
      style
    } = this.props
    this.page = page
    return stateReceived || process.env.REACT_APP_MOCK ? (
      <DocumentTitle title={documentTitle}>
        {_.isEmpty(keyMap) ? (
          <div style={style}>
            <Snackbar/>
            {children}
          </div>
        ) : (
          <HotKeys
            style={style}
            keyMap={keyMap}
            handlers={handlers}
            focused
          >
            <Snackbar/>
            {children}
          </HotKeys>
        )}
      </DocumentTitle>
    ) : (
      <Loading>
        <CircularProgress/>
      </Loading>
    )
  }

  componentDidMount() {
    if (!process.env.REACT_APP_MOCK) this.props.enterPage()
  }

  componentWillUnmount() {
    if (!process.env.REACT_APP_MOCK) this.props.exitPage(this.page)
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page,
    stateReceived: state.cache.stateReceived[state.navigation.page]
  }),
  { enterPage, exitPage },
  PageWrapper
)
