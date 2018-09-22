import React from 'react'

import Navbar from '../components/navbar'

import * as pages from '../pages'

import { to } from '../actions/navigation'
import { moveMouse, changePageSize } from '../actions/generic'

import { connectTo } from '../utils/generic'
import { PAGES_WITH_NAVBAR } from '../constants/navigation'

import styled from 'styled-components'

const Layout = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

class MainLayout extends React.Component {
  render() {
    const { page } = this.props
    if (!page) return 'No page was specified'
    const Page = pages[page]
    return (
      <Layout>
        {PAGES_WITH_NAVBAR.includes(page) && <Navbar />}
        <Page />
      </Layout>
    )
  }

  // no need to remove event listeneres declared in this block
  // since it will not be unmounted
  componentDidMount() {
    const { moveMouse, changePageSize } = this.props
    window.addEventListener('popstate', this.popstate)
    window.addEventListener('resize', () =>
      changePageSize({ width: window.innerWidth, height: window.innerHeight })
    )
    document.addEventListener('mousemove', ({ clientX, clientY }) =>
      moveMouse({ mouseX: clientX, mouseY: clientY })
    )
  }

  // to: custom back button handle
  popstate = () => {
    // const { page, currentProject, to } = this.props
    // if (page === 'Dashboard') return

    // window.history.pushState({ }, '', '')
    // to((page === 'ProjectDetails' || !currentProject) ? 'Dashboard' : 'ProjectDetails')
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page
  }),
  { moveMouse, changePageSize, to },
  MainLayout
)
