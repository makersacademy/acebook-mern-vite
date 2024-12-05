// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "../pages/CSS.css"
import { Link } from "react-router-dom";
import { PhotoUpload } from "./PhotoUpload";
import { PhotoDisplay } from "./PhotoDisplay";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${BACKEND_URL}/users/getUsers`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data.users);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading users...</div>;

    return (
    <div className="post-card-2">
        <h2>People you may know</h2>
        {users.length > 0 ? (
            users.map(user => (
                <div key={user._id} className="user-item">
                        <Link 
                className="other-profile-link" 
                to={`/profile/${user.username}`}>{user.firstName} {user.lastName}
            </Link>  
            <img className="userlistimage" src={`${BACKEND_URL}/${user.filePath}`} width="50"></img>
                    </div>
                ))
            ) : (
            <div>No users found</div>
        )}
    </div>
    );
}
