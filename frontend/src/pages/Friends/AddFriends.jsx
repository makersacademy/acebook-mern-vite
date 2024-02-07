import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getUsers } from "../../services/profile";
import Friend from "../../components/Friends/Friends";

export const FriendPage = () => {
    const [friends, setFriends] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getUsers(token)
                .then((data) => {
                    setFriends(data.users);
                    console.log(data.users)
                    setToken(data.token)
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        } else {
            navigate("/login");
        }
    }, []);

    if (!token) {
        return;
    }

    return(
        <>
            <h2>Users</h2>
            <hr></hr>
            <div className="feed" role="feed">
                {friends.map((user) => (
                    <div key={user._id}>
                        <Friend user={user} key={user._id} />
                        </div>
                ))}   
            </div>     
        </>
    );
};