import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import User from "../../components/User";
import { getFriends, getNonFriendUsers } from "../../services/friends";
import Friend from "../../components/Friend";

export function FriendsPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      try {

        if (loggedIn) {
          const usersData = await getNonFriendUsers(token)
          setUsers(usersData.users)
          const friendsData = await getFriends(token)
          setFriends(friendsData.friends)
          localStorage.setItem("token", friendsData.token);


        }
      } catch (err) {

        console.error(err);
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <div className="home">
      <NavBar></NavBar>

      <h1>Check out your Friends!</h1>
      {friends.map((friend) => (
        <Friend key={friend._id} _id={friend._id} username={friend.username} />
      ))}
      <p>Temporary listing all users</p>
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
}
