import { useNavigate } from "react-router-dom";
import React from "react";
import "./Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();
    const handleProfile = () => {
    navigate("/profile");
    };

    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    };

    return (
        <nav>
            <div className="navbar">
               <button className="profile" onClick={handleProfile}>My Profile</button>
               <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;

