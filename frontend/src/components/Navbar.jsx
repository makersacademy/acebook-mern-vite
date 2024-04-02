import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"
import User from "./User/Username";
import { getUser } from "../services/users";
import { useState, useEffect } from "react";
 
const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const [users, setUsers] = useState([]);
  

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        
        getUser(token)
        
          .then((data) => {
            setUsers(data.user);
            localStorage.setItem("token", data.token);   
          })
          .catch((err) => {
            console.error(err);            
          });
        
    }
  }, []);

  return (
     <nav>
      <ul className="navbar me-auto">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        </ul>
        <ul className="navbar">
        <li>
        <div className="profile" role="profile">
        
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
        </div>
          
        </li>
        <li>        
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};
 
export default Navbar;