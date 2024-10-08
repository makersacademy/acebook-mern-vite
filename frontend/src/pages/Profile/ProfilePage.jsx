import NavBar from "../../components/NavBar";
import CreatePost from "../../components/CreatePost";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPosts } from "../../services/posts";
import ListOfPosts from "../../components/ListOfPosts";
//import { createPost } from "../../services/posts";

export function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [createPostState, setCreatePostState]= useState(false)
  const navigate = useNavigate();


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
          // navigate("/login");
        });
    }
  }, [navigate, createPostState]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }
  return (
    <>
      <NavBar></NavBar>
      <h1 data-testid="profilePage-h1">Welcome to your profile!</h1>
      <CreatePost
        setPosts={setPosts}
        setCreatePostState={setCreatePostState}
        createPostState={createPostState}
      ></CreatePost>
      <h2>Posts</h2>
      <div className="feed-component" role="feed-component">
        <ListOfPosts posts={posts}/>         
      </div>
    </>
  );
}
