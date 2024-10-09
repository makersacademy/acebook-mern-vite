import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, updatePost } from "../services/posts";
import Post from "./Post";

const AllPosts = ({ refresh, ...props }) => {

  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const handleReverse = () => {
      setPosts([...posts].reverse());
  }

  // GET POSTS
  useEffect(() => {
    //trigger when a post is created
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts.reverse()); // Set the posts as reversed
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate, refresh]); // Pass in the refresh value. If this changes then it reruns this useEffect

  // LIKE POST
  const toggleLike = (postId) => {
    const token = localStorage.getItem("token");
    if (token) {
      updatePost(postId)
        .then((updatedPost) => {
          // Update the posts state with the updated post
          setPosts((prevPosts) => {
            return prevPosts.map((post) => {
              if (post._id === updatedPost.post._id) {
                return updatedPost.post; // If the post is the updated one, replace it
              } else {
                return post; // Otherwise, leave it as is
              }
            });
          });
        })
        .catch((err) => {
          console.error("Error toggling like:", err);
        });
    }
  };

   // let displayPosts; // this may cause problems
  // // Change postFilter to all for all posts/ curretnUser for curren user's posts
  // if (props.postFilter === "currentUser") {
  //   displayPosts = posts.filter((post) => post.author._id == props.user._id);
  // } else {
  //   displayPosts = posts;
  // }

  // if (postReverse) {
  //   displayPosts = displayPosts.reverse();
  //   console.log("displayPosts", displayPosts);
  // }


  if (props.postFilter === "all") {
    return (
      <div className="feed" role="feed">
        <button onClick={handleReverse} className="reverse-btn p-2 mt-2">Reverse</button>
        {posts.map((post) => (
          <Post
            post={post}
            key={post._id}
            user={props.user}
            toggleLike={toggleLike}
          />
        ))}
    
      </div>
    );
  } else if (props.postFilter === "currentUser") {
    const currentUsersPosts = posts.filter((post) => post.author._id === props.user._id)
    return (
      <div className="feed" role="feed">
        <button onClick={handleReverse}>Reverse</button>
        {currentUsersPosts.map((post) => (
          <Post
            post={post}
            key={post._id}
            user={props.user}
            toggleLike={toggleLike}
          />
        ))}
      </div>
    );
  }

};

export default AllPosts;
