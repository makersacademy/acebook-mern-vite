import React, { useEffect } from 'react';
// import './Navbar.css';

const Navbar = () => {
    const effectRan = React.useRef(false);
    const createNavbar = () => {

    const navbarItems = [
      { text: 'Search', id: 'searchButton'},
      { text: 'Home', id: 'home', link: '/' },
      { text: 'Logout', id: 'logout', link: '/login' },
      { text: 'User', link: '/users/:username' }
    ];

    const navbarContainer = document.getElementById('navbar');

    const container = document.createElement('div');
    // container.style.width = '100vw';
    // container.style.backgroundColor = '#333';
    // container.style.padding = '10px';
    // container.style.borderBottom = '1px solid #ddd';
    // container.style.display = 'flex';
    // container.style.textAlign = 'center';  
    // container.style.boxSizing = 'border-box';

    const searchInput = document.createElement('input');
    searchInput.type = 'input';
    searchInput.placeholder = 'Search';
    container.appendChild(searchInput);

    navbarItems.forEach(item => {
        const linkElement = document.createElement('a');
        linkElement.href = item.link;
        linkElement.id = item.id;
        linkElement.textContent = item.text;
        

        container.appendChild(linkElement);
    });

    navbarContainer.appendChild(container);
};
  useEffect(() => {
    if (!effectRan.current) {
        createNavbar()
          }
    
    return () => effectRan.current = true;
  }, []);

  return <div data-testid="navbar" id="navbar"></div>;
};

export default Navbar;