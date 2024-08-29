import React from 'react'
import { AppBar, Toolbar, styled } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Header = styled(AppBar)`
Background-color : black;
position:static;
`

const Tabs = styled(NavLink)`
font-size: 20px;
margin-right:10%;
text-decoration : none;
color : white;
`

const Navbar = () => {
  return (<>
    <Header>
      <Toolbar>
        <Tabs to='/'>Search User</Tabs>
        <Tabs to="/users">All Users</Tabs>
        <Tabs to='/add'>Add Users</Tabs>
        <Tabs to='/about'>About</Tabs>
        
      </Toolbar>
    </Header>
  </>
  )
}

export default Navbar