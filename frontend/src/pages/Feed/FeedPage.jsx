import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getUserProfile } from "../../services/authentication";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  // const [fullName, setFullName] = useState("");
  // const [profilePicture, setProfilePicture] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {

      // getUserProfile(token)
      //   .then((data) => {
      //     setFullName(data.fullName);
      //     setProfilePicture(data.profilePicture);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     navigate("/login");
      //   });

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
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      {/* <h1>Hello {fullName}</h1>
      {profilePicture && <img src={profilePicture} alt="Profile" />} */}
      <h1>Create a new Post</h1>
      <div className="createpost" role="feed">
        <CreatePost />
      </div>
      <h2>Posts</h2>
      <div className="feed" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </>
  );
};
