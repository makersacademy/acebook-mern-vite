import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Friend } from "../../components/Friend";
import { addFriend, removeFriend } from "../../services/users";



export const FriendsPage = () =>{
    const token = localStorage.getItem("token");
    const friendUserId = "6659bf908211f3e770e47584";
    const [friendStatus, setFriendStatus] = useState(false);
    const navigate = useNavigate();
    const handleAdd = async () => {
        if (friendStatus == false) {
        
        try {
            await addFriend(token, friendUserId);
            navigate("/friends");
        } catch (err) {
            console.error(err);
            navigate("/friends");
        }
        } else if (friendStatus == true) {
            try {
            await removeFriend(token, friendUserId);
            navigate("/friends");
        } catch (err) {
            console.error(err);
            navigate("/friends");
        
        }}
        setFriendStatus(!friendStatus)}

    return (
        <>
        <h1>Friends</h1>
        < Friend />
        <button onClick={ handleAdd }>{friendStatus ? 'Unfriend' : 'Add Friend'}</button>
    </>
    )
};