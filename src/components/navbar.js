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

const Navbar = ({ unauthorizeUser, dropdownOpen, dropdownAnchor, toggleDropdown }) => {
  return (
    <AppBar position='static'>
      <StyledToolbar>
        <Logo/>
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
            <MenuItem onClick={() => toggleDropdown() && unauthorizeUser()}>Logout</MenuItem>
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