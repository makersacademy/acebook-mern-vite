import { useState } from "react"

const Nav = ({logo, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownMenuOpen, setdropdownMenuOpen] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <nav className="flex items-center justify-between p-4">
      {/* Logo - image */}
      <div className="logo">
        <img src={logo} alt="Logo" className="h-8" />
      </div>

      {/* Search - search bar */}
      <form className="search" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="px-4 py-2 border rounded"
        />
      </form>

      {/* Home - link to feed page */}
      <div className="home">
        <a href="/posts" className="px-4 py-2">
          Home {/* Need to find icon for this */}
        </a>
      </div>

      {/* Profile - dropdown with Profile/Settings options when profile clicked */}
      <div className="profile relative">
        <button
        onClick={() => setdropdownMenuOpen(!dropdownMenuOpen)}
        className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          👤 {/* Need to find icon for this */}
        </button>
        
          {/* Conditionally render menu by toggling the state between true & false */}
        { dropdownMenuOpen && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
              Account Settings
            </a>
          </div>
      )}
      </div>
    </nav>
  )
}

export default Nav
