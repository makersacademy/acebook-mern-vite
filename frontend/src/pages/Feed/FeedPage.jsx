import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { Post } from "../../components/Post/Post";

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
        // extra logic so that if the user does not have a token they will be redirected to the login endpoint
        if (!token) {
          navigate("/login");
          return;
        }
    }
  }, [navigate]);

    // logic for the create post button. When it is clicked the user is redirected to the createpost endpoint. Create Post button likely to be moved/modified in future PR's
  const handleCreatePost = (event) => {
    event.preventDefault();
      navigate("/createpost")
    }

  return (
    // Logout component temporarily implemented here, should be moved to navbar once created
    <>
      <h2>Posts</h2>
      <button onClick={handleCreatePost}>Create Post</button>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
