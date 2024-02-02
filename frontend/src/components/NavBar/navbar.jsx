import React, { useState } from 'react';
import './Navbar.css';
import SearchNavItem from './SearchNavItem';
import HomeNavItem from './HomeNavItem';
import LogoutNavItem from './LogoutNavItem';
import LoginNavItem from './LoginNavItem';
import SignupNavItem from './SignupNavItem';
import SearchResultsDropDown from './SearchResultsDropDown';
import { Link } from 'react-router-dom';


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
  
    <div className="logo-nav-item"> 
    <Link to={`/`}>
      <h3>AB</h3>
      </Link>
    </div>

    <div data-testId="searchItem" className="search-nav-item">
    <SearchNavItem 
      handleSearch={handleSearch}
    />
    </div>

    <div className="home-nav-item">
    <HomeNavItem />
    </div>
    
    {token ? 

    <div className="logout-nav-item"> 
      <LogoutNavItem />
    </div>
      :
      <>
    <div className="login-nav-item"> 
      <LoginNavItem />
    </div>
    <div className="login-nav-item"> 
      <SignupNavItem />
    </div>
      </>
    }
    </div>
    {showSearchResults && 
    <div className="search-results-dropdown">
      <SearchResultsDropDown 
      setShowSearchResults={setShowSearchResults}
        foundUsers={foundUsers}
      />
    </div>
}


</>
  );
};

export default Navbar;