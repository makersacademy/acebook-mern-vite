import { useState, useEffect } from 'react';
import { getFriendRequestResponse } from "../../services/users";
import { friendRequestResponse } from "../../services/users";

// takes user_id of who's logged in to fetch friend requests 
// return list of friend requests to respond to
// respond to friend requests

const FriendRequest = () => {
    const [token] = useState(window.localStorage.getItem("token"));
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                const friendRequestData = await getFriendRequestResponse(token);
                setFriendRequests(friendRequestData);
                } catch (err) {
                console.error('Error fetching user information:', err);
                }
            }
        }
        fetchData()
    }, [token]);

    const handleAcceptRequest = async (friend) => {
        try {
            // sends the token, user_id of who the friend request is from, and confirmation of request
            await friendRequestResponse(token, friend.id, true);
            const updatedRequestData = await getFriendRequestResponse(token);
            setFriendRequests(updatedRequestData);
        } catch (err) {
            console.error('Error accepting request', err.message);
        }
    };

    return (
    <div className="requests" role="requests">
        {friendRequests.map((friend) => (
            <div key={friend.id}>
                <p>{friend.id}</p>
                <button onClick={() => handleAcceptRequest(friend)}>Add Friend</button>
            </div>
        ))}
    </div>
    )
}

export default FriendRequest