import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts, createPost } from "../../services/posts";
import Post from "../../components/Post/Post";
import PostButton from "../../components/Input/PostButton";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
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

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  // const handleCreatePost = async () => {
  //   if (token) {

  //   }
  // }

  return (
    <>
      <h2>Posts!</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
          
        ))}
        <PostButton />
      <div>
        id=test 
      </div>
      </div>
    </>
  );
};
