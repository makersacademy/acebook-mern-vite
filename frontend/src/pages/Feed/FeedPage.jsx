import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { Post } from "../../components/Post/Post";
import { CreatePost } from "../../components/Post/CreatePost";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      console.log("Redirected to login, no token found")
    }
    if (token) {
      getPosts(token)
        .then((data) => {
          const sorted_posts = data.posts.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

          setPosts(sorted_posts);
          localStorage.setItem("token", data.token);
        
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <>
      <h2>Posts</h2>
      <CreatePost />
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
