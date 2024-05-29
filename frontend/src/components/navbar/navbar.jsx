import React from "react";
import "./navbar.css";
import { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
const Navbar =  () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");


    const handleLogout = () =>{
            localStorage.removeItem("token");
            navigate("/login")
            // onLogout();
            
        };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);};

    const handleSubmit = (event) =>{
        event.preventDefault()

    }
        

    return (
        <nav className="navbar" id="navbar">
            <div className = "logo">
                <p>Acebook</p>
            </div>
            <div className = "navbar-left">
                <form onSubmit = {handleSubmit}>
                <input id="searchbar" type="text" placeholder="Search.." value={search} onChange={handleSearchChange}></input>
                </form>

                {/* <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input
                id="search"
                type="text"
                value={search}
                onChange={handleEmailChange}/> */}

            </div>
            <div className= "navbar-right">
                <Link to = {"/friends"}>Friends</Link>
                <Link to = {"/profile"}>Profile</Link>
                {/* <Link to = {"/logout"}>logout</Link> */}
                <button onClick={handleLogout}>Log out </button>
            </div>
        </nav>
    )        
};

/* // const onLogout = () =>{ */
//     Navigate("/login")
// }

// Links : friends, profile nad logout
// Searchbar



    // const handleFriends = () =>{
    //     navigate("/friends");
    //     // onLogout();
        
    // };


export default Navbar;

