import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUser } from "../../services/user";

export const UserPage = () => {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();
    const { username } = useParams();

    useEffect(() => {
        if (token) {
            getUser(token, username)
                .then((data) => {
                    setUser(data.user);
                    setToken(data.token);
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.err(err);
                });
            } else {
            navigate("/login");
            }
        });
    
        if (!token) {
            navigate("/login")
        }
        
        if (user.length === 0) {
            return(
                <>
                <h1>User not found</h1>
                </>
            )
        }

        return (
            <>
            <h1>User Page</h1>
            <p>ID {user._id}</p>
            <p>Username {user.username}</p>
            <p>Email {user.email}</p>
            <p>Friends emails</p>
            {user.friends.map((friend) => (
                <p key={friend._id}> {friend.email} </p>
            
            ))}
            
            </>
        );

};