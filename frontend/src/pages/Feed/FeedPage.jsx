import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import MakePost from "../../components/Post/MakePost";
import LogoutButton from "../../components/LogoutButton";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

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

  // needs tests to account for edge case
  // like getting here by typing in the URL without being logged in
  // instead of navigating here through the website
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
    {/* {console.log('\n\nlocalStorage.getItem("user_id") is', user_id)} */}
      <MakePost value={refresh} update={setRefresh} />
      <LogoutButton />
      <Link to={`/profile/${user_id}`}>Your Profile</Link>
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} value={refresh} update={setRefresh} />
        ))}
      </div>
    </>
  );
};
