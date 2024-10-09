import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, updatePost } from "../services/posts";
import Post from "./Post";

const AllPosts = (props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [postReverse, setPostReverser] = useState(true); // Determines which button to render based on postReverse status
  const handleReverse = () => {
    setPostReverser(!postReverse); // reverse postss from default order
  };
  // const handleUnreverse = () => {
  //   setPostReverser(false); // returns to default order
  // };

  // GET POSTS
  useEffect(() => {
    //trigger when a post is created
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
  }, [navigate]);

  // LIKE POST
  const toggleLike = (postId) => {
    const token = localStorage.getItem("token");
    if (token) {
      updatePost(postId)
        .then((updatedPost) => {
          // console.log(`90 feed: Updated Post = ${updatedPost}`);
          // Update the posts state with the updated post
          setPosts((prevPosts) => {
            return prevPosts.map((post) => {
              if (post._id === updatedPost.post._id) {
                // console.log(`95 feed updated post = ${updatedPost.post}`)
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

  let displayPosts; // this may cause problems
  // Change postFilter to all for all posts/ curretnUser for curren user's posts
  if (props.postFilter === "currentUser") {
    displayPosts = posts.filter((post) => post.author._id == props.user._id);
  } else {
    displayPosts = posts;
  }
  if (postReverse) {
    displayPosts = displayPosts.reverse();
  }
  return (
    <div className="feed" role="feed">
      <button onClick={handleReverse}>Reverse</button>
      {displayPosts.map((post) => (
        <Post
          post={post}
          key={post._id}
          user={props.user}
          toggleLike={toggleLike}
        />
      ))}
    </div>
  );

  // {postReverse ? (
  //       // conditional rendering based on postReverse status being true, renders reversed initially
  //       <div className="feed" role="feed">
  //         {[...posts].reverse().map((post) => (
  //           <Post
  //             post={post}
  //             key={post._id}
  //             user={props.user}
  //             toggleLike={toggleLike}
  //           />
  //         ))}
  //         <button onClick={handleUnreverse}>Unreverse</button>{" "}
  //         {/*Button reverses currently displayed order*/}
  //       </div>
  //     ) : (
  //       // conditional rendering based on postReverse status being false
  //       <div className="feed" role="feed">
  //         {posts.map((post) => (
  //           <Post
  //             post={post}
  //             key={post._id}
  //             user={props.user}
  //             toggleLike={toggleLike}
  //           />
  //         ))}
  //         <button onClick={handleReverse}>Reverse</button>{" "}
  //         {/*Button reverses currently displayed order*/}
  //       </div>
  //     )}

  // if (props.postFilter === "all") {
  //   return (
  //     <div className="feed" role="feed">
  //       {posts.map((post) => (
  //         <Post
  //           post={post}
  //           key={post._id}
  //           user={props.user}
  //           toggleLike={toggleLike}
  //         />
  //       ))}
  //     </div>
  //   );
  // } else if (props.postFilter === "currentUser") {
  //   const currentUsersPosts = posts.filter((post) => post.author._id == props.user._id)
  //   return (
  //     <div className="feed" role="feed">
  //       {currentUsersPosts.map((post) => (
  //         <Post
  //           post={post}
  //           key={post._id}
  //           user={props.user}
  //           toggleLike={toggleLike}
  //         />
  //       ))}
  //     </div>
  //   );
  // }
};

export default AllPosts;
