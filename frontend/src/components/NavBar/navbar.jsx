import React, { useState } from 'react';
import './Navbar.css';
import SearchNavItem from './SearchNavItem';
import HomeNavItem from './HomeNavItem';
import LogoutNavItem from './LogoutNavItem';
import LoginNavItem from './LoginNavItem';
import SignupNavItem from './SignupNavItem';
import SearchResultsDropDown from './SearchResultsDropDown';


const Navbar = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [foundUsers, setFoundUsers] = useState([])


    const handleSearch = (searchResults) => {
      setShowSearchResults(true)
      setFoundUsers(searchResults)
      console.log("search results", searchResults)

    }


  return (
  <>
  <div data-testid="navbar" id="navbar">
    <h3>aceBook</h3>
  <SearchNavItem 
  
    handleSearch={handleSearch}
  />
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
  <div className="search-results-dropdown">
    <SearchResultsDropDown 
      foundUsers={foundUsers}
    />
  </div>


</>
  );
};

export default Navbar;