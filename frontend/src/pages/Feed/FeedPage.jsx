import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getUserProfile } from "../../services/authentication";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post/Post";
import CreatePost from "../../components/Post/CreatePost"
import Navbar from "../../components/Comment/NavBar/Navbar";
import UserDetails from "../../components/User/UserDetails";
import "./FeedPage.css";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  
  

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token");
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
  }, [navigate]);



  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }



  return (
    <>
      <Navbar />
      <UserDetails />
        <div className="feed-page">
          {/* <h1>Hello {fullName}</h1> */}
          <h2>Your feed</h2>
          <div className="createpost" role="feed">
            <CreatePost />
          </div>
          {/* <h2>Posts</h2> */}
          <div className="post_list" role="feed">
            {posts.map((post) => (
              <Post post={post} key={post._id} />
            ))}
             
          </div>
        </div>  
    </>
  );
};
