import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../../services/users";
import User from "../../components/User/User";
import Navbar from "../../components/Navbar";

import { getProfilePosts } from "../../services/posts";
import CreatePost from "../../components/Post/CreatePost"
import Post from "../../components/Post/Post";


export const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

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
          navigate("/login");
        });
    }
  }, [navigate]);
    
    const getNewPostTrigger = (token) => {
      getProfilePosts(token)
          .then((data) => {
            setPosts(data.posts);
            localStorage.setItem("token", data.token);
          })
    } 
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      else {
        getNewPostTrigger(token);
        }
    }, [navigate]);
  
    const handleCreatePost = async () => {
      try {
        const token = localStorage.getItem("token");
        getNewPostTrigger(token);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      <Navbar />
      <h2>Profile</h2>
      <div className="profile" role="profile">
        
        {users.map((user) => (
          <User user={user} key={user._id} />
        ))}
      </div>
      {/* <div><FeedPage/></div> */}
      <>
      <h2>Posts</h2>
      <div>
      <CreatePost onCreatePost={handleCreatePost}/>
      </div>
      <br></br>
      <h3>All the posts:</h3>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
    </>
  );
};