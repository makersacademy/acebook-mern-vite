import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { updateUserInfo } from "../../services/updateUser.js";
import { getAllUserInfo } from "../../services/user.js"

import "./AccountPage.css";

export const AccountPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile_picture, setProfilePicture] = useState("");

    const [user, setUser] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            getAllUserInfo(token)
                .then((data) => {
                setUser(data.user);
                console.log(data.user)
                setToken(data.token);
                window.localStorage.setItem("token", data.token);
                })
        .catch((err) => {
            console.error(err);
            console.log(err)
            });
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
            try {
                await updateUserInfo(username, email, password, profile_picture, token);
                console.log("Details updated!");
            } catch (err) {
                console.error(err);
            }
        };
    
        const handleUsernameChange = (event) => {
            setUsername(event.target.value);
        };
    
        const handleEmailChange = (event) => {
            setEmail(event.target.value);
        };
    
        const handlePasswordChange = (event) => {
            setPassword(event.target.value);
        };
    
        const handleProfilePictureChange = (event) => {
            setProfilePicture(event.target.value);
        };
    
    return (
        <>
        <div className="accountpage">
            <Navbar />
                <h1>This is your Account page!</h1>
            </div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
                <input
                id="username"
                placeholder={user.username}
                type="text"
                value={username}
                onChange={handleUsernameChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                id="email"
                placeholder={user.email}
                type="email"
                value={email}
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                onChange={handleEmailChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                id="password"
                placeholder="********"
                type="password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
                value={password}
                onChange={handlePasswordChange}
                />
                <label htmlFor="profile_picture">Add Profile Picture:</label>
                <input
                id="profile_picture"
                type="file"
                value={profile_picture}
                onChange={handleProfilePictureChange}
                />
                <input role="submit-button" id="submit" type="submit" value="Update" />
            </form>
        </>
        );
    };