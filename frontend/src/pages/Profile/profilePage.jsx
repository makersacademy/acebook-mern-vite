import Navbar from "../../components/Post/Navbar";
import { useState, useEffect } from "react";
import { getUser } from "../../services/user"

export const ProfilePage = () => {
    document.title = "Profile Page"
    
    const [user, setUser] = useState({});
    const [token, setToken] = useState(window.localStorage.getItem("token"))
    const id = window.localStorage.getItem("id")


    useEffect(() => {
        getUser(token, id)
            .then((data) => {
                setUser(data.user)
            })
            .catch((error) => {
                console.error(error)
            })
    })
    

    return (
        <>
        <Navbar />

        <div className="profile">
        <h1>Profile Page</h1>
        </div>
        <p>{user.full_name}</p>
        <p>{user.email}</p>
        <p>{user.profile_pic}</p>
        </>
    )
};

