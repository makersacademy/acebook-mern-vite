import { useState, useEffect } from "react";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";

export const FeedPage = ({ props }) => {
  const [posts, setPosts] = useState([]);
  const changePage = props.setPage;

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
          changePage("login");
        });
    }
  }, [changePage]);

  const token = localStorage.getItem("token");
  if (!token) {
    changePage("login");
    return;
  }

  return (
    <>
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
