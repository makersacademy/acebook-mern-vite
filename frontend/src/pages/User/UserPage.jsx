import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../services/user";
import User from "../../components/User/User";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import Navbar from "../../components/NavBar/navbar";
import "./Userpage.css"


export const UserPage = () => {
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(window.localStorage.getItem("user")))
    // const [profilePicture, setProfilePicture] = useState()
    // const [bio, setBio] = useState("")
    const [stateChange, setStateChange] = useState(false)
    
    const { username } = useParams();
    const navigate = useNavigate();

    // const handleImageUpdate = (newImage) => {
    //     setProfilePicture(newImage)
    // }

    // const handleBioUpdate = (newBio) => {
    //     setBio(newBio)
    // }

    const triggerStateChange = () => {
        setStateChange(!stateChange)
    }


    useEffect(() => {
        if (token) {
            getUser(token, username)
                .then((data) => {
                    setUser(data.user);
                    setToken(data.token);
                    // setProfilePicture(data.user.image)
                    // setBio(data.user.bio)
                    window.localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                });
            } else {
            navigate("/login");
            } 
        }, [username, triggerStateChange]);
    
        if (!token) {
            navigate("/login")
        }
        
        if (user.length === 0) {
            return(
                <>
                <h1>User not found</h1>
                </>
            )
        }

        return (
            <>
            <Navbar />
            <h1>User Page</h1>
            

            
                {loggedInUser._id === user._id && 

                <EditUserModal 
                username={username}
                image={user.image}
                triggerStateChange={triggerStateChange}
                />

                }
                <div className="user-container">
                <User 
                    key={user._id}
                    _id={user._id}
                    username={user.username}
                    email={user.email}
                    bio={user.bio}
                    friends={user.friends}
                    image={user.image}
                    posts={user.posts}
                    loggedInUserId={loggedInUser._id}
                    token={token}
                    triggerStateChange={triggerStateChange}
                />
                </div>
            
            </>
        );

};