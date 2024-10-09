import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getPosts, updatePost } from "../../services/posts";
// import Post from "../../components/Post";
import CreatePostForm from "../../components/CreatePostForm";
import { getAllUsers} from "../../services/users";
import { getUser } from "../../services/users";
import UserProfile from "../../components/UserProfile";
import { NavbarComponent } from "../../components/NavbarComponent";
import AllPosts from "../../components/AllPosts";

export function FeedPage() {

  // const [posts, setPosts] = useState([]);

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({});

  // const [likedBy, setLikedBy] = useState([])
  
  const navigate = useNavigate();
  // const [postReverse, setPostReverser] = useState(true); // Determines which button to render based on postReverse status
  // const handleReverse = () => {
  //   setPostReverser(true); // reverse postss from default order
  // }
  // const handleUnreverse = () => {
  //   setPostReverser(false); // returns to default order
  // }

  //creat function to pass in to useEffect below

  // // GET POSTS
  // useEffect(() => { //trigger when a post is created 
  //   const token = localStorage.getItem("token");
  //   const loggedIn = token !== null;
  //   if (loggedIn) {
  //     getPosts(token)
  //       .then((data) => {
  //         setPosts(data.posts);
  //         localStorage.setItem("token", data.token);
  //         // localStorage.setItem("user", data.user);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         navigate("/login");
  //       });
  //     }
  //   // }, [navigate, posts]); // added posts argument to re-render page upon post
  //   }, [navigate]); // added posts argument to re-render page upon post

    // GET USERS
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getAllUsers(token)
        .then((data) => {
          setUsers(data.users);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
      }
    }, [navigate]);

    // GET USER
    useEffect(() => {
      const token = localStorage.getItem("token");
      const loggedIn = token !== null;
      if (loggedIn) {
        getUser(token)
          .then((data) => {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user)) // add all user data to local storage !! INCLUDES PASSWORD !!
            localStorage.setItem("username", data.user.username) // adds username to local storage
            localStorage.setItem("token", data.token);
          })
          .catch((err) => {
            console.error(err);
            navigate("/login");
          });
        }
      }, [navigate]);

  // LIKE POST
  // const toggleLike = (postId) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     updatePost(postId) 
  //       .then((updatedPost) => {
  //         console.log(`90 feed: Updated Post = ${updatedPost}`);
  //         // Update the posts state with the updated post
  //         setPosts((prevPosts) => {
  //           return prevPosts.map((post) => {
  //             if (post._id === updatedPost.post._id) {
  //               console.log(`95 feed updated post = ${updatedPost.post}`)
  //               return updatedPost.post; // If the post is the updated one, replace it
  //             } else {
  //               return post; // Otherwise, leave it as is
  //             }
  //           });
  //         });
  //       })
  //       .catch((err) => {
  //         console.error("Error toggling like:", err);
  //       });
  //   }
  // };


  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  return (
    <>
    <NavbarComponent />
      <h2>Posts</h2>
      <CreatePostForm />

      <AllPosts 
          user={user}
          postFilter="all"
      />


      <h2>All User Profiles</h2>
      <div>
        {users.map((user, index) => (
            <UserProfile user={user} key={index} />
          ))}
        {/* {users.map((user) => (
            <UserProfile user={user} key={user._id} />
          ))} */}
      </div>
      <br />

      <h2>Current User Profile</h2>
      <div>
        <img src={user.imgURL}></img> {/* Displays the img from the imgURL property of current user*/}
        {user && <UserProfile user={user} key={user._id} />}
      </div>
    </>
  );
}


