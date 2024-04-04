import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { Post } from "../../components/Post/Post";

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



    // logic for the create post button. When it is clicked the user is redirected to the createpost endpoint. Create Post button likely to be moved/modified in future PR's
  const handleCreatePost = (event) => {
    event.preventDefault();
      navigate("/createpost")
    }

    const handleEditProfile = (event) => {
      event.preventDefault();
        navigate("/updateuser")
      }

  return (
    <>
      <h2>Posts</h2>
      <button onClick={handleCreatePost}>Create Post</button>
      <button onClick={handleEditProfile}>Edit Profile</button>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
