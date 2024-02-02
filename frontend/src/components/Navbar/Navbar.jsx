import  { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.css';
import ang from '../../assets/ang_profile.jpeg';

import { getAllUserInfo } from "../../services/user"

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    };

    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            getAllUserInfo(token)
                .then((data) => {
                setUser(data.user);
                console.log(data.user)
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
                })
        .catch((err) => {
            console.err(err);
            console.log(err)
            });
        }
    }, []);


    return (
        <div className="container-fluid">
        <nav className="navbar sticky-top navbar-light">
                    <div className="col">
                    <Link className="navbar-brand mb-0 h1" to='/'>Acebook</Link>
                    </div>
                    <div className="user-greeting">
                    Hi {user.username || "You"}  
                    </div>
                    <div className="col">
                    <div className="dropdown">
                    <img
                    src={ user.profile_picture || ang }
                    alt="Profile Picture"
                    className="img-thumbnail"
                    style={{ maxWidth: '15%' }}
                    onClick={handleDropdownToggle}
                    />
                    <div
                    className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}
                    aria-labelledby="navbarDropdown"
                    >
                    <button className="dropdown-item" type="button">
                    <Link to='/profilepage'>Profile</Link>
                    </button>
                    <button className="dropdown-item" type="button">
                    <Link to='/accountpage'>Account</Link>
                    </button>
                    <button className="dropdown-item" type="button">
                        Logout
                    </button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    );
};


export default Navbar;


