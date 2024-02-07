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
    const [profilePicture, setProfilePicture] = useState(ang);

    useEffect(() => {
        if (token) {
            getAllUserInfo(token)
                .then((data) => {
                setUser(data.user);
                console.log(data.user)
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
                if (data.user.profile_picture) {
                    fetchImage(data.user.profile_picture);
                }
                })
        .catch((err) => {
            console.error(err);
            console.log(err)
            });
        }
    }, []);
    
    const fetchImage = async (imageName) => {
        try {
            // this makes a request to the server to fetch the image
            const response = await fetch(`http://localhost:3000/upload/${imageName}`);
            const blob = await response.blob();
            setProfilePicture(URL.createObjectURL(blob));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    return (
        <div className="container-fluid">
        <nav className="navbar sticky-top navbar-light">
                    <div className="col">
                    <Link className="navbar-brand mb-0 h1" to='/'>Acebook</Link>
                    </div>
                    <div className="user-greeting" data-testid="user-greeting">
                    Hi {user.username || "You"}  
                    </div>
                    <div className="col">
                    <div className="dropdown">
                    <img
                    src={profilePicture}
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


