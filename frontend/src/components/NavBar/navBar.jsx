import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './NavBar.css';
export const NavBar = () => {
    const location = useLocation();

    


    return (

        <nav className="navbar-container">
            {/* <button><img>?</img></button> */}

            {location.pathname !== '/profile' && (
                <h3>
                    <button className="nav-button"><Link to="/profile">Profile</Link></button>
                </h3> 
            )}

            {location.pathname !== '/posts' && (
                location.pathname !== '/editPage' && 
                <h3>
                    <button className="nav-button"><Link to="/posts">Feed</Link></button>
                </h3> 
            )}
            <button className="nav-button"><Link to ="/Login">Signout</Link></button>
        
        </nav>
        
        
    );

}



    // redirect to profile
    // redirect to login page

    // logo

    // banner

