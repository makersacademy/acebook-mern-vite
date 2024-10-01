import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFriends } from "../../services/friends";
import Friend from "../../components/Friend";
import LogoutButton from "../../components/LogoutButton";

export function FriendsPage() {
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedIn = token !== null;
        if (loggedIn) {
        getFriends(token)
            .then((data) => {
            setFriends(data.posts);
            localStorage.setItem("token", data.token);
            })
            .catch((err) => {
            console.error(err);
            navigate("/login");
            });
        }
    }, [navigate]);

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        
    }
    
    return (
        <>
        <h2>Check out your Friends!</h2>
       {/* <h1>{friends.email}</h1> */}
{/*      <div className="friend" role="friend">
            {friends.map((user) => (
            <Friend user={user} key={user._id} />
            ))}
        </div> */}
        <LogoutButton />
        </>
    );
}

