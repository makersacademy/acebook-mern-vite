import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import MakePost from "../../components/Post/MakePost";
import LogoutButton from "../../components/LogoutButton";


export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  // Remove in future. Find a better way of rerendering componants and not rerendeing the whole feed page
  // Possibly start investingating at Like.jsx??
  // Changes necessary to MakePost.jsx
  const [refresh, setRefresh] = useState(false);
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
  }, [navigate, refresh]);

  // needs tests to account for edge case like getting here by typing in the URL without being logged in instead of navigating here through the website
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  let parentPosts = posts.filter((item) => !item.parent)
  return (
    <>
      <MakePost value={refresh} update={setRefresh} />
      <LogoutButton />
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {parentPosts.map((post) => (
          <Post post={post} key={post._id} value={refresh} update={setRefresh} />
        ))}
      </div>
    </>
  );
};
