import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { PostList } from "../../components/PostList";
import { NavBar } from "../../components/NavBar";
import { NewPost } from "../../components/NewPost";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [reloadPosts, setReloadPosts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
          console.log(data)
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate, reloadPosts]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  const handleReloadPosts = () => {
    setReloadPosts((prevState) => !prevState);
  };

  return (
    <>
    <NavBar />
      <NewPost handleReloadPosts={handleReloadPosts}/>
      <h2>Posts</h2>
      <PostList posts={posts}/>
    </>
  );
}
