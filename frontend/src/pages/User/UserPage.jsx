import NavBar from "../../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import { getUser }  from "../../services/users";
import Post from "../../components/Post";
import { useParams } from "react-router-dom";


export function UserPage() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const { userId } = useParams()
    
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getPosts(token, userId)
          .then((data) => {
            setPosts(data.posts);
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            navigate("/login");
          });
      }
    }, [navigate, userId]);
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getUser(token, userId)
          .then((data) => {
            setUser(data.user);
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            // navigate("/login");
          });
      }
    }, [navigate, userId]);
  
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    return (
      <>
      <NavBar></NavBar>
      <h1 data-testid="username-heading">{`${user?.username}'s Profile`}</h1>
      
      <h2>Posts</h2>
        {/* Should be replaced by the feed component */}
        <div className="feed" role="feed">
          {posts.map((post) => (
            <Post 
              key={post._id} 
              message={post.message} 
              dateCreated={post.dateCreated}
              username={post.user?.username}
              noOfLikes={post.noOfLikes}
            />
          ))}
        </div>
      </>
    )
  }
  
  