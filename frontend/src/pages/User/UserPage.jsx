
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import { getUserInfo } from "../../services/user";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import ListOfPosts from "../../components/ListOfPosts";
import { AddFriend } from "../../components/AddFriend";
import { getFriends } from "../../services/friends";


export function UserPage() {
  
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const navigate = useNavigate();
  const { userId } = useParams();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getPosts(token, userId)
          .then((data) => {
            setPosts(data.posts);
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            navigate("/login");
          });
      }
    }, [navigate, userId]);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getUserInfo(token, userId)
          .then((data) => {
            setUser(data.userInfo[0]);
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            // navigate("/login");
          });
      }
    }, [navigate, userId]);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getFriends(token)
        .then((data) => {
          setFriends(data.friends);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);
  // useEffect(() => {
  //   if (friends) {
  //     const hasId = friends.some((friend) => friend._id === user._id);
  //     setIsFriend(hasId);
  //   }
  // }, [user, friends]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  return (
    <>
      <NavBar></NavBar>
      <h1 data-testid="username-heading">{`${user.username}'s Profile`}</h1>   
//       {!isFriend && <AddFriend userId={userId} />}

      <h2>Posts</h2>
        <ListOfPosts posts={posts}/>  
      </>
    )
  }
  
