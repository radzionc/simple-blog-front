import React from 'react'
import { AppBar, Toolbar, Menu, MenuItem, IconButton } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import styled from 'styled-components'

import * as actions from '../actions/navbar'
import { to } from '../actions/navigation'
import { unauthorizeUser } from '../actions/auth'
import { connectTo } from '../utils/generic'

import Logo from './logo'


const StyledToolbar = styled(Toolbar)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Navbar = ({ to, unauthorizeUser, dropdownOpen, dropdownAnchor, toggleDropdown }) => {
  const itemHandler = func => () => {
    toggleDropdown()
    func()
  }
  return (
    <AppBar position='static'>
      <StyledToolbar>
        <Logo onClick={() => to('start')}/>
        <div>
          <IconButton
            aria-owns={dropdownOpen ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={({ currentTarget }) => toggleDropdown(currentTarget)}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={dropdownAnchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={dropdownOpen}
            onClose={toggleDropdown}
          >
            <MenuItem onClick={itemHandler(unauthorizeUser)}>Sign out</MenuItem>
            <MenuItem onClick={itemHandler(() => to('editor'))}>New story</MenuItem>
            <MenuItem onClick={itemHandler(() => to('yourStories'))}>Stories</MenuItem>
          </Menu>
        </div>
      </StyledToolbar>
    </AppBar>
  )
}

export default connectTo(
  state => state.navbar,
  { ...actions, to, unauthorizeUser },
  Navbar
)