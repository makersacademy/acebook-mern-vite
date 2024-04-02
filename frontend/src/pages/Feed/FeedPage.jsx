import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import Logout from "../../components/General/Logout";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
    else {
        navigate("/login");
        return;
      }
    
  }, [navigate]);

  return (
    // Logout component temporarily implemented here, should be moved to navbar once created
    <>
      <Logout /> 
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
