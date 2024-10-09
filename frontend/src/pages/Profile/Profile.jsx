import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/users";
import UserProfile from "../../components/UserProfile";
import { NavbarComponent } from "../../components/NavbarComponent";
// import ProfilePost from "../../components/ProfilePosts";
// import { getPosts } from "../../services/posts";
import { UploadProfilePic } from "../../components/uploadProfilePicture";
import AllPosts from "../../components/AllPosts";



export function Profile() {
  const [user, setUser] = useState({});
  // const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  // GET USER
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getUser(token)
        .then((data) => {
          setUser(data.user);
          console.log("data.user", data.user)
          localStorage.setItem("user", JSON.stringify(data.user)); // add all user data to local storage
          localStorage.setItem("username", data.user.username); // adds username to local storage
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  // GET POSTS
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const loggedIn = token !== null;
  //   if (loggedIn) {
  //     getPosts(token)
  //       .then((data) => {
  //         setPosts(data.posts);
  //         localStorage.setItem("token", data.token);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         navigate("/login");
  //       });
  //   }
  // // }, [navigate, posts]); // added posts argument to re-render page upon post
  // }, [navigate]); // added posts argument to re-render page upon post

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  // const currentuser = localStorage.getItem("username");

  // const filteredPosts = posts.filter((post) => post.user === currentuser);

  // console.log("filtered posts", filteredPosts)

  console.log("user", user)
  return (
    <>
      <NavbarComponent />
      <h2>My Profile</h2>
      <img src={user.imgURL}></img>
      <div>{user && <UserProfile user={user} key={user._id} />}</div>
      <div className="feed" role="feed">
        <h2>Posts you have submitted: </h2>
        {/* {filteredPosts.map((post) => (
          <ProfilePost key={post._id} post={post} user={user}/>  // key={post._id} was post.id in like branch
        ))} */}
        <AllPosts 
          user={user}
          postFilter="currentUser"
        />
      </div>
    </>
  );
}
