import { useState } from "react";
import { HomeIcon, User2Icon, SettingsIcon, SearchIcon, MenuIcon} from 'lucide-react';
import '../assets/styles/Nav.css';

const Nav = ({logo, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  }

  

  return (
    <nav className="nav">
      <div className="nav-inner flex items-center justify-between p-6">
        {/* Logo - image */}
        <div className="nav-logo">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Search - search bar */}
        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for anything..." 
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="search-input"
          />
          <SearchIcon className="search-icon w-5 h-5" />
        </form>

        {/* Home - link to feed page */}
        <div className="home">
          <a href="/posts" className="nav-home-link flex items-center justify-center">
            <HomeIcon className="home-icon w-6 h-6" />
          </a>
        </div>

        {/* Profile - dropdown with Profile/Settings options when profile clicked */}
        <div className="profile-container">
          <button
            onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}
            className="profile-button flex items-center justify-center">
            <MenuIcon className="menu-icon w-5 h-5" />
          </button>
          
          {/* Conditionally render menu by toggling the state between true & false */}
          {dropdownMenuOpen && (
            <div className="dropdown-menu">
              <a href="/profile" className="dropdown-item">
                <User2Icon className="dropdown-icon w-5 h-5" />
                Profile
              </a>
              <a href="/settings" className="dropdown-item">
                <SettingsIcon className="dropdown-icon w-5 h-5" />
                Account Settings
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav

// the nav bar is vertical instead of horizontal. 
// Also, the search icon is outside of the input field and i want it inside. 
// I also want it sticky so it scrolls with the user