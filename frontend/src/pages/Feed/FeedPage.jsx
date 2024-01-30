// FeedPage.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import Navbar from "../../components/Post/Navbar"; 
import "./FeedPage.css";
import CreateNewPost from "./CreateNewPost";

export const FeedPage = () => {
  document.title = "Posts"
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          setToken(data.token);
          window.localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.err(err);
        });
    } else {
      navigate("/login");
    }
  }, [token, navigate]); //Needed if useEffect is used anywhere else

  if (!token) {
    return;
  }

  return (
    <>
      <Navbar />
      <br></br> 
      <br></br>
      <CreateNewPost token={token}/>
      <br></br>
      <h2>Posts</h2>
      <div className="feed" role="feed">
      {[...posts].reverse().map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
