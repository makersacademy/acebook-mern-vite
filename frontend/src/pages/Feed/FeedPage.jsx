import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts, createPost } from "../../services/posts";
import Post from "../../components/Post/Post";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  
    const postData = {
      message,
      date: new Date(),
    };
  
    try {
      const newPost = await createPost(token, postData);
      setPosts([newPost, ...posts]);
      setMessage("");
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };
////////////
return (
  <>
    <h2>Posts</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
    <div className="feed" role="feed">
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  </>
);
};
