import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/CreatePost";
import LogOut from "../../components/LogOut";
import ProfileButton from "../../components/ProfileButton";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts.reverse());
          // console.log("feedpage, data.posts: ", data.posts[0].author.username);

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

  return (
    <>
      <div>
        <ProfileButton />
        <LogOut />
        <CreatePost />
      </div>
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            username={post.author ? post.author.username : "anonymous"}
          />
        ))}
      </div>
    </>
  );
};
