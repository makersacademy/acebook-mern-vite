import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import CreatePostForm from "../../components/CreatePostForm";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [postReverse, setPostReverser] = useState(true); // Determines which button to render based on postReverse status
  const handleReverse = () => {
    setPostReverser(true); // reverse postss from default order
  }
  const handleUnreverse = () => {
    setPostReverser(false); // returns to default order
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
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
  }, [navigate, posts]); // added posts argument to re-render page upon post

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
      <h2>Posts</h2>
      {postReverse ? 
      ( // conditional rendering based on postReverse status being true, renders reversed initially
      <div className="feed" role="feed">
          {[...posts].reverse().map((post) => (
          <Post post={post} key={post._id}/>
        
        ))}
        <button onClick={handleUnreverse}>Unreverse</button> {/*Button reverses currently displayed order*/}
      </div>): 

      ( // conditional rendering based on postReverse status being false
      <div className="feed" role="feed">
        {posts.map((post) => (
      <Post post={post} key={post._id}/>
        ))}
        <button onClick={handleReverse}>Reverse</button> {/*Button reverses currently displayed order*/}
      </div>)
}

      <LogoutButton />

      <CreatePostForm />
    </>
  );
}


