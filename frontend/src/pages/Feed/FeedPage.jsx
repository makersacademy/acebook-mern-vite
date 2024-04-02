
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";

import CreatePost from "../../components/Post/CreatePost"
import Post from "../../components/Post/Post";
import Navbar from "../../components/Navbar";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  
  const getNewPostTrigger = (token) => {
    getPosts(token)
        .then((data) => {
          const allPosts = data.posts
          allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
          setPosts(allPosts);
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

  return (
    <>
      <Navbar /><br /><br />
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
  );
};
