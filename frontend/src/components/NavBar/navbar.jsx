import React, { useState } from 'react';
import './Navbar.css';
import SearchNavItem from './SearchNavItem';
import HomeNavItem from './HomeNavItem';
import LogoutNavItem from './LogoutNavItem';
import LoginNavItem from './LoginNavItem';
import SignupNavItem from './SignupNavItem';


const Navbar = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"))

  return (
  
  <div data-testid="navbar" id="navbar">
    <h3>aceBook</h3>
  <SearchNavItem />
  <HomeNavItem />
  {token ? 
    <LogoutNavItem />
    :
    <>
    <LoginNavItem />
    <SignupNavItem />
    </>
  }
  
  </div>
  );
};

export default Navbar;