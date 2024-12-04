import React, { useState, useEffect } from "react";
import "../pages/CSS.css"

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
    <div>
        {users.length > 0 ? (
            users.map(user => (
                <div key={user._id} className="user-item">
                        <h3>{user.firstName} {user.lastName}</h3>
                    </div>
                ))
            ) : (
            <div>No users found</div>
        )}
    </div>
    );
}
