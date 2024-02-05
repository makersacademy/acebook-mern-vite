import Navbar from "../../components/Post/Navbar";
import { useState, useEffect } from "react";
import { getUser } from "../../services/user"
import "./profilePage.css"
import Post from "../../components/Post/Post";
import { getPostsByUser } from "../../services/posts";

export const ProfilePage = () => {
    document.title = "Profile Page"
    
    const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const id = window.localStorage.getItem("id")
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getUser(token, id)
            .then((data) => {
                setUser(data.user)
            })
            .catch((error) => {
                console.error(error)
            })
        getPostsByUser(token, id)
            .then((data) => {
              setPosts(data.posts);
              setToken(data.token);
              window.localStorage.setItem("token", data.token);
            })
            .catch((err) => {
              console.err(err);
            });
    }, [token, id])
    

    return (
        <>
        <Navbar />
        <h1>My Profile</h1>
        
        <div className="profile">
            <img src={user.profile_pic} alt="profile pic" className="profilePage_user_picture"/>
            <div className="user-details">
                <p>Username: {user.full_name}</p>
                <br />
                <p>Email: {user.email}</p>
                <br />
                {user.about_me && <p>About Me: {user.about_me}</p>}
            </div>
            <div className="posts-by-user">
                <h2>My posts</h2>
                {[...posts].reverse().map((post) => (
                    <Post post={post} key={post._id} token={token} />
                ))}
            </div>
        </div>
        </>
    )
};

